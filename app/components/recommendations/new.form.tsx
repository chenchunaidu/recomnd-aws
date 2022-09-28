import type { FC } from "react";
import { Form } from "@remix-run/react";
import CustomForm from "../common/form/form";
import { createRecommendationFormData } from "./new.data";
import Heading from "../common/heading";
import TransitionButton from "../common/transition-button";
import type { Transition } from "@remix-run/react/dist/transition";

export interface CreateRecommendationActionData {
  data?: {
    title?: string;
    description?: string;
  };
  errors?: {
    title?: string;
    description?: string;
  };
}

export interface CreateRecommendationProps {
  actionData: CreateRecommendationActionData;
  transition?: Transition;
}

const CreateRecommendation: FC<CreateRecommendationProps> = ({
  actionData,
  transition,
}) => {
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-10 shadow-sm">
      <div>
        <Heading order="6" className="text-slate-800">
          New recommendation
        </Heading>
      </div>
      <Form method="post">
        <div className="flex flex-col space-y-4">
          <CustomForm
            inputs={createRecommendationFormData}
            actionData={actionData}
          />
          <TransitionButton
            transition={transition}
            text={{
              submitting: "Adding...",
              actionRedirecting: "Added redirecting...",
            }}
          >
            Add
          </TransitionButton>
        </div>
      </Form>
    </div>
  );
};

export default CreateRecommendation;
