import type { User } from "~/models/user.server";
import type { FC } from "react";
import React from "react";
import Avatar from "../common/avatar";
import Text from "../common/text";
import Image from "../common/image";
import logo from "~/assets/images/recomnd-logo-with-text.svg";
import { Link } from "react-router-dom";

interface ProfileProps {
  user: User;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  if (!user) return null;
  return (
    <div className="flex  items-center justify-between px-4 pt-4 shadow-sm md:py-4">
      <div className="flex items-center space-x-2 md:space-x-4">
        <Avatar size="lg" src={user.avatar} />
        <Text className="text-md">
          <div className="font-semibold text-violet-900">{user.name}'s</div>{" "}
          <div className="font-light text-slate-500">recommendations</div>{" "}
        </Text>
      </div>
      <Link to="/">
        <Image src={logo} className="h-12" />
      </Link>
    </div>
  );
};

export default Profile;
