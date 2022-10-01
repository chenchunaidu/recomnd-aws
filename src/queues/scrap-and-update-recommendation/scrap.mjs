import arc from "@architect/functions";
import ogs from "open-graph-scraper";

export const getMetaData = (url) => {
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

export const getImage = (image) => {
  if (!image) return "";
  if (Array.isArray(image)) return image[0]?.url;
  return image?.url;
};

export const transformMeta = (meta) => {
  if (meta.result.success === false) {
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

export const updateMeta = async (recommendation) => {
  const meta = await getMetaData(recommendation.url);
  console.log(meta);
  if (!meta) return;
  const db = await arc.tables();
  const updatedData = await db?.recommendations.put({
    ...recommendation,
    ...transformMeta(meta),
    fullMeta: JSON.stringify(meta.result),
  });
  console.log(updatedData);
  return updatedData;
};

export const scrapAndUpdateMeta = async ({ userId, id }) => {
  const db = await arc.tables();
  const recommendations = await db.recommendations.query({
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: { ":pk": userId, ":sk": id },
  });
  await updateMeta(recommendations.Items?.[0]);
};
