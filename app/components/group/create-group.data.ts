import type { FormInputProps } from "../common/form/input";
import * as yup from "yup";

export const createGroupFormData: FormInputProps[] = [
  {
    label: "Title",
    inputProps: {
      id: "post-title",
      name: "title",
      autoFocus: true,
      placeholder: "Favorite music recommendations",
      required: true,
    },
  },
  {
    label: "Description",
    formInputType: "textarea",
    inputProps: {
      id: "description",
      name: "description",
      rows: 5,
      placeholder:
        "I like all types of music from old country music to new punk music. here are my top suggestions",
    },
  },
];

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(3, "Title should be longer than 3 letter")
    .max(250),
  description: yup.string().required("Description is required"),
});
