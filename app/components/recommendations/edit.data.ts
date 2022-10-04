import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const editRecommendationFormData: FormInputProps[] = [
  {
    label: "URL",
    inputProps: {
      id: "url",
      name: "url",
      autoFocus: true,
      placeholder: "https://www.hotstar.com/in/movies/rrr/1260108122",
      required: true,
    },
    helperText: "Enter url of the recommendation",
  },
  {
    label: "Title",
    inputProps: {
      id: "title",
      name: "title",
    },
    helperText: "Enter title of the recommendation",
  },
  {
    label: "Description",
    formInputType: "textarea",
    inputProps: {
      id: "description",
      name: "description",
    },
    helperText: "Enter description of the recommendation",
  },
];

export const createRecommendationValidationSchema = yup.object().shape({
  url: yup.string().required().url(),
  groupId: yup.string(),
});
