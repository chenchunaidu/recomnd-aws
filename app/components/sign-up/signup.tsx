import type { FC } from "react";
import AuthContainer from "../login/auth-container";
import { Form, Link } from "@remix-run/react";
import CustomForm from "../common/form/form";
import { singUpFormData } from "./signup.data";
import Text from "../common/text";
import Image from "../common/image";
import logo from "~/assets/images/recomnd-logo-with-text.svg";
import TransitionButton from "../common/transition-button";
import type { Transition } from "@remix-run/react/dist/transition";

export interface SignUpActionData {
  data?: {
    email?: string;
    password?: string;
    name?: string;
    server?: string;
  };
  errors?: {
    email?: string;
    password?: string;
    name?: string;
    server?: string;
  };
}

interface SignUpProps {
  actionData: SignUpActionData;
  transition: Transition;
}

const SignUp: FC<SignUpProps> = ({ actionData, transition }) => {
  return (
    <AuthContainer>
      <div className="flex flex-col bg-white h-full w-full p-10 space-y-14">
        <Image src={logo} className="h-16" />
        <Form method="post">
          <div className="flex flex-col space-y-4">
            <CustomForm inputs={singUpFormData} actionData={actionData} />
            <div className="pt-1 text-xs text-rose-600">
              {actionData?.errors?.server}
            </div>
            <Text>
              Already have an account?
              <Link to="/login" className="underline ml-2">
                login
              </Link>
            </Text>

            <TransitionButton
              type="submit"
              variant="solid"
              transition={transition}
              text={{
                submitting: "Creating account ...",
                actionRedirecting: "Created account... redirecting",
              }}
            >
              Create account
            </TransitionButton>
          </div>
        </Form>
      </div>
    </AuthContainer>
  );
};

export default SignUp;
