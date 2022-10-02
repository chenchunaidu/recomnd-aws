import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/common/button";
import Container from "~/components/common/container";
import Heading from "~/components/common/heading";
import Cards from "~/components/user/cards";
import { requiredUser } from "~/lib/auth/auth";
import { getRecommendationsByUserId } from "~/models/recommendation.server";
import { PlusIcon, ShareIcon } from "@heroicons/react/24/solid";
import Tooltip from "~/components/common/tooltip";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getRecommendationsByUserId(user.id);
  return { recommendations: data, user };
};

export default function Homepage() {
  const { recommendations, user } = useLoaderData();
  return (
    <Container className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading order="6">Recommendations</Heading>
        <div className="-space-x-2">
          <Link to="/home/recommendations/new">
            <Button variant="link">
              <PlusIcon className="h-6 w-6"></PlusIcon>
            </Button>
          </Link>
          <Tooltip
            content="Link copied to clipboard"
            className="-ml-24 w-48 bg-violet-600"
            tooltipTrigger="click"
          >
            <Button
              variant="link"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/users/${user?.id || ""}`
                );
              }}
            >
              <ShareIcon className="h-5 w-5"></ShareIcon>
            </Button>
          </Tooltip>
        </div>
      </div>
      <Cards cards={recommendations} showEmptyCardsMsg={true} />
    </Container>
  );
}
