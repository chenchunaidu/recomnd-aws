import type { FC } from "react";
import { Form, Link } from "@remix-run/react";
import CustomForm from "../common/form/form";
import { createRecommendationFormData } from "./new.data";
import Heading from "../common/heading";
import TransitionButton from "../common/transition-button";
import type { Transition } from "@remix-run/react/dist/transition";
import type { Option } from "../common/select";
import FormInput from "../common/form/input";

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
  groupOptions?: Option[];
}

const EmptyGroupsMessage = () => (
  <>
    Currently you have no groups.{" "}
    <Link
      to="/home/groups/new?redirectTo=home/recommendations/new"
      className="text-violet-500 underline"
    >
      Create new group
    </Link>{" "}
    before selecting a group
  </>
);

const CreateRecommendation: FC<CreateRecommendationProps> = ({
  actionData,
  transition,
  groupOptions = [],
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
          <FormInput
            formInputType="select"
            label="Select Group"
            helperText="Group names will be useful for grouping of your recommendations"
            disabledMessage={<EmptyGroupsMessage />}
            inputProps={{
              id: "group",
              name: "groupId",
              options: groupOptions,
              disabled: !groupOptions?.length,
            }}
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
