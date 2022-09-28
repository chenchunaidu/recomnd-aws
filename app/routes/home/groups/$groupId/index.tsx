import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/common/button";
import Container from "~/components/common/container";
import Group from "~/components/user/group";
import { requiredUser } from "~/lib/auth/auth";
import { getRecommendationsByGroupId } from "~/models/recommendation.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const data = await getRecommendationsByGroupId(
    user.id,
    parseInt(params.groupId || "0")
  );
  return data?.[0] || {};
};

export default function GroupPage() {
  const group = useLoaderData();
  return (
    <Container className="flex h-full flex-col justify-between space-y-4 pb-4">
      <Group {...group} view="grid" />
      <Link to={`/home/groups/${group.id}/recommendations/new`}>
        <Button className="w-full">Add new recommendation</Button>
      </Link>
    </Container>
  );
}
