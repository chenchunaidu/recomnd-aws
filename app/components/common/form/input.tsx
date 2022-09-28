import type { FC } from "react";
import React from "react";
import type { InputProps } from "../input";
import Input from "../input";
import Label from "../label";
import type { TextAreaProps } from "../text-area";
import TextArea from "../text-area";
import Text from "../text";

type FormInputTypes = "default" | "textarea";

interface FormInputProps {
  error?: string;
  label?: string;
  validator?: Function | Function[];
  formInputType?: FormInputTypes;
  inputProps: InputProps | TextAreaProps;
}

const FormInputs = {
  default: Input,
  textarea: TextArea,
};

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormInputProps
>(
  (
    {
      error,
      label,
      formInputType = "default",
      inputProps: { id, ...props } = {},
    },
    ref
  ) => {
    const Component = FormInputs[formInputType];
    return (
      <div>
        <Label htmlFor={id}>
          <Text>{label}</Text>
          {<Component id={id} {...props}></Component>}
        </Label>
        {error && (
          <div className="pt-1 text-xs text-rose-600" id="email-error">
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
export type { FormInputProps };
