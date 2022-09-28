import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import HomeGroups from "~/components/home/groups";

import { requiredUser } from "~/lib/auth/auth";
import { getGroupsByUserId } from "~/models/group.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getGroupsByUserId(user.id);
  return { groups: data };
};

export default function Homepage() {
  const { groups } = useLoaderData();

  return (
    <Container>
      <HomeGroups groups={groups} />
    </Container>
  );
}
