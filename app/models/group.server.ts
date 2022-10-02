import arc from "@architect/functions";
import invariant from "tiny-invariant";
import { v4 as uuidv4 } from "uuid";

export type Group = {
  id: number;
  userId: string;
  title: string;
  description: string;
};

export const createGroup = async ({ userId, ...group }: Group) => {
  const db = await arc.tables();
  const newGroup = await db.groups.put({ pk: userId, ...group, sk: uuidv4() });
  return newGroup;
};

export const getGroupsByUserId = async (userId: string) => {
  const db = await arc.tables();
  const groups = await db.groups.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });
  return groups.Items.map((group) => ({ ...group, id: group.sk }));
};

export const getGroupByGroupId = async (userId: string, groupId: string) => {
  const db = await arc.tables();
  const groups = await db.groups.query({
    KeyConditionExpression: "pk= :pk AND sk = :sk",
    ExpressionAttributeValues: { ":sk": groupId, ":pk": userId },
  });
  return groups.Items.map((group) => ({ ...group, id: group.sk }));
};
