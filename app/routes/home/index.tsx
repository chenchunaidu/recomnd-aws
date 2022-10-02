import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import Button from "~/components/common/button";
import Container from "~/components/common/container";
import Heading from "~/components/common/heading";
import Cards from "~/components/user/cards";
import { requiredUser } from "~/lib/auth/auth";
import { getRecommendationsByUserId } from "~/models/recommendation.server";
import { PlusIcon, ShareIcon } from "@heroicons/react/24/solid";
import CopyToClipBoardButton from "~/components/common/copy-to-clipboard";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getRecommendationsByUserId(user.id);
  return { recommendations: data, user };
};

export default function Homepage() {
  const { recommendations, user } = useLoaderData();
  const location =
    typeof window !== "undefined" ? window?.location?.origin : "";

  return (
    <Container className="space-y-4">
      <div className="flex items-center justify-between p-4 md:p-0">
        <Heading order="6">Recommendations</Heading>
        <div className="-space-x-2">
          <Link to="/home/recommendations/new">
            <Button variant="link">
              <PlusIcon className="h-6 w-6"></PlusIcon>
            </Button>
          </Link>
          <CopyToClipBoardButton
            copyText={`${location}/users/${user?.id || ""}`}
          >
            <ShareIcon className="h-5 w-5" />
          </CopyToClipBoardButton>
        </div>
      </div>
      <Cards cards={recommendations} showEmptyCardsMsg={true} isAdmin={true} />
    </Container>
  );
}
