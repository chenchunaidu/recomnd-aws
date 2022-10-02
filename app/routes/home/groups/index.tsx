import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import { requiredUser } from "~/lib/auth/auth";
import { getGroupsByUserId } from "~/models/group.server";
import HomeGroups from "~/components/home/groups";
import Heading from "~/components/common/heading";
import { PlusIcon } from "@heroicons/react/24/solid";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getGroupsByUserId(user.id);
  return { groups: data, user };
};

export default function GroupsPage() {
  const { groups, user } = useLoaderData();

  return (
    <Container className="space-y-4">
      <div className="h-full w-full space-y-10 px-2">
        <div className="flex w-full justify-between">
          <Heading order="6">Groups</Heading>
          <Link to="/home/groups/new">
            <PlusIcon className="h-6 w-6 hover:via-violet-500" />
          </Link>
        </div>
        <HomeGroups groups={groups} showEmptyCardsMsg />
      </div>
    </Container>
  );
}
