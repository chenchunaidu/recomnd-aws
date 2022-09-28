import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createRecommendationFormData: FormInputProps[] = [
  {
    label: "URL",
    inputProps: {
      id: "url",
      name: "url",
      autoFocus: true,
      placeholder: "",
      required: true,
    },
  },
];

export const createRecommendationValidationSchema = yup.object().shape({
  url: yup.string().required().url(),
});
