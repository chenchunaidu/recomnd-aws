import { useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { validateFormData } from "~/components/common/form/utils";
import type { CreateRecommendationActionData } from "~/components/recommendations/new.form";
import {
  createRecommendationFormData,
  createRecommendationValidationSchema,
} from "~/components/recommendations/new.data";
import { createRecommendation } from "~/models/recommendation.server";
import CreateRecommendation from "~/components/recommendations/new.form";
import { requiredUser } from "~/lib/auth/auth";
import Container from "~/components/common/container";

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requiredUser(request);
  const formData = await request.formData();
  const { errors, formOutput } = await validateFormData(
    formData,
    createRecommendationFormData,
    createRecommendationValidationSchema
  );
  if (!errors) {
    try {
      const res = await createRecommendation({
        ...formOutput,
        userId: user.id,
        groupId: 0,
      });
      return redirect(`/home`);
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  return { errors, data: formOutput };
};

export default function CreateRecommendationPage() {
  const actionData = useActionData() as CreateRecommendationActionData;
  const transition = useTransition();

  return (
    <Container className="h-full w-full md:w-1/2">
      <CreateRecommendation actionData={actionData} transition={transition} />
    </Container>
  );
}
