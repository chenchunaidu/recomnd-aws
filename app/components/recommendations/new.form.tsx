import type { FC } from "react";
import { Form, Link } from "@remix-run/react";
import type { CustomFormProps } from "../common/form/form";
import CustomForm from "../common/form/form";
import { createRecommendationFormData } from "./new.data";
import Heading from "../common/heading";
import type { TransitionButtonText } from "../common/transition-button";
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
  title?: string;
  submitButtonLabel?: string;
  submitButtonLabelTexts?: TransitionButtonText;
  formSchema?: CustomFormProps["inputs"];
  groupDefaultValue?: string;
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
  title = "New recommendation",
  submitButtonLabel = "Add",
  submitButtonLabelTexts = {
    submitting: "Adding...",
    actionRedirecting: "Added redirecting...",
  },
  formSchema = createRecommendationFormData,
  groupDefaultValue,
}) => {
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-10 shadow-sm">
      <div>
        <Heading order="6" className="text-slate-800">
          {title}
        </Heading>
      </div>
      <Form method="post">
        <div className="flex flex-col space-y-4">
          <CustomForm inputs={formSchema} actionData={actionData} />
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
              defaultValue: groupDefaultValue,
            }}
          />
          <TransitionButton
            transition={transition}
            text={submitButtonLabelTexts}
          >
            {submitButtonLabel}
          </TransitionButton>
        </div>
      </Form>
    </div>
  );
};

export default CreateRecommendation;
