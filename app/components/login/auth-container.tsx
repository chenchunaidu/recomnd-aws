import type { ReactNode } from "react";
import React from "react";
import AuthInfo from "./auth-info";

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="flex lg:p-10 h-full w-full bg-violet-700 flex-col lg:flex-row justify-center">
      <div className="w-full hidden lg:flex item-center justify-center p-10">
        <AuthInfo />
      </div>
      <div className="w-full p-5 md:p-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
