import arc from "@architect/functions";
import invariant from "tiny-invariant";

export type Group = {
  id: number;
  userId: string;
  title: string;
  description: string;
};

export const createGroup = async ({ userId, ...group }: Group) => {
  const db = await arc.tables();
  console.log(group, userId);
  const newGroup = await db.groups.put({ pk: userId, ...group });
  return newGroup;
};

export const getGroupsByUserId = async (userId: string) => {
  const db = await arc.tables();
  const groups = await db.groups.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });
  return groups.Items.map((group) => ({ ...group, id: group.pk }));
};
