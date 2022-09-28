import type { FC } from "react";
import AuthContainer from "./auth-container";
import { Form, Link } from "@remix-run/react";
import CustomForm from "../common/form/form";
import { loginFormData } from "./login.data";
import Text from "../common/text";
import type { Transition } from "@remix-run/react/dist/transition";
import TransitionButton from "../common/transition-button";
import Image from "../common/image";
import logo from "~/assets/images/recomnd-logo-with-text.svg";

export interface LoginActionData {
  data?: {
    email?: string;
    password?: string;
    server?: string;
  };
  errors?: {
    email?: string;
    password?: string;
    server?: string;
  };
}

interface LoginProps {
  actionData: LoginActionData;
  transition?: Transition;
}

const Login: FC<LoginProps> = ({ actionData, transition }) => {
  return (
    <AuthContainer>
      <div className="flex flex-col bg-white h-full w-full p-10 space-y-14">
        <Image src={logo} className="h-16" />
        <Form method="post">
          <div className="flex flex-col space-y-4">
            <CustomForm inputs={loginFormData} actionData={actionData} />
            <div className="pt-1 text-xs text-rose-600">
              {actionData?.errors?.server}
            </div>
            <Text>
              Don't have account?
              <Link to="/sign-up" className="underline ml-2">
                Create new account
              </Link>
            </Text>

            <TransitionButton
              type="submit"
              variant="solid"
              transition={transition}
              text={{
                submitting: "Logging in ...",
                actionRedirecting: "Logged in... redirecting",
              }}
            >
              Login
            </TransitionButton>
          </div>
        </Form>
      </div>
    </AuthContainer>
  );
};

export default Login;
