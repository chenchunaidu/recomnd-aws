import arc from "@architect/functions";
import invariant from "tiny-invariant";
import type { OpenGraphImage } from "open-graph-scraper";
import ogs from "open-graph-scraper";
import { v4 as uuidv4 } from "uuid";

interface Metadata {
  title: string;
  description: string;
  media: string;
}

export type Recommendations = {
  id: number;
  userId: string;
  groupId: number;
  url: string;
  title: string;
  description: string;
  media: string;
  createdAt: string;
  fullMeta: string;
};

export const getMetaData = (url: string) => {
  try {
    const options = {
      url,
      timeout: 10000,
      headers: {
        "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
      },
    };
    const data = ogs(options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getImage = (
  image?: string & (OpenGraphImage | OpenGraphImage[])
) => {
  if (!image) return "";
  if (Array.isArray(image)) return image[0]?.url;
  return image?.url;
};

export const transformMeta = (
  meta: ogs.SuccessResult | ogs.ErrorResult
): Metadata => {
  if (meta.error) {
    return {
      title: "",
      description: "",
      media: "",
    };
  }
  return {
    title: meta.result.ogTitle || "",
    description: meta.result.ogDescription || "",
    media: getImage(meta.result.ogImage),
  };
};

export const updateMeta = async (recommendation: Recommendations) => {
  const meta = await getMetaData(recommendation.url);
  if (!meta) return;
  const db = await arc.tables();
  const updatedData = await db?.recommendations.put({
    ...recommendation,
    ...transformMeta(meta),
    fullMeta: JSON.stringify(meta.result),
  });
  return updatedData;
};

export const createRecommendation = async ({
  groupId,
  userId,
  ...recommendation
}: Pick<Recommendations, "url" | "userId" | "groupId">) => {
  const db = await arc.tables();
  const newRecommendation = await db?.recommendations.put({
    ...recommendation,
    id: uuidv4(),
    pk: userId,
    title: "",
    description: "",
    media: "",
    fullMeta: {},
    sk: groupId,
  });
  updateMeta(newRecommendation);
  return newRecommendation;
};

export const getRecommendationsByUserId = async (userId: string) => {
  const db = await arc.tables();
  const recommendations = await db.recommendations.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });
  return recommendations.Items;
};

export const getRecommendationsByGroupId = async (
  userId: string,
  groupId: number
) => {
  const db = await arc.tables();
  const recommendations = await db.recommendations.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });
  return recommendations.Items;
};

export async function deleteRecommendation(id: string) {
  const db = await arc.tables();
  await db.recommendations.delete({ pk: id });
}