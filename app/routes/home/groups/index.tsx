import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import { requiredUser } from "~/lib/auth/auth";
import { getGroupsByUserId } from "~/models/group.server";
import HomeGroups from "~/components/home/groups";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getGroupsByUserId(user.id);
  return { groups: data, user };
};

export default function GroupsPage() {
  const { groups, user } = useLoaderData();

  return (
    <Container className="space-y-4">
      <HomeGroups groups={groups} />
    </Container>
  );
}
