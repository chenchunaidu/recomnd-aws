import type { FC, ReactNode } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Image from "../common/image";
import logo from "~/assets/images/recomnd-logo-with-text.svg";

interface NavLinkProps {
  children: ReactNode;
  to: string;
}

interface HeaderProps {
  userId?: string;
}

export const NavLink: FC<NavLinkProps> = ({ children, to }) => {
  return (
    <Link className="text-sm text-slate-700" to={to}>
      {children}
    </Link>
  );
};

const Header: FC<HeaderProps> = ({ userId }) => {
  return (
    <div className="border w-full p-4 flex justify-between items-center">
      <Image src={logo} className="h-10" />
      <div className="flex space-x-8 mr-16">
        <NavLink to="/home">Home</NavLink>
        <NavLink to={`/users/${userId}`}>Preview</NavLink>
        <NavLink to="/account">Account</NavLink>
      </div>
    </div>
  );
};

export default Header;
