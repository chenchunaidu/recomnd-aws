import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Container from "~/components/common/container";
import Fullscreen from "~/components/common/full-screen";
import Profile from "~/components/user/profile";
import { getUserById } from "~/models/user.server";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.userId) return { groups: [] };
  const user = await getUserById(params.userId);
  return { user };
};

export default function UserPage() {
  const { user } = useLoaderData();

  return (
    <Fullscreen className="flex flex-col items-center">
      <Container className="space-y-4">
        <Profile user={user} />
        <Outlet />
      </Container>
    </Fullscreen>
  );
}
