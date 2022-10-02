import type { Group } from "~/models/group.server";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../common/button";
import Heading from "../common/heading";
import HomeGroup from "./group";
import { PlusIcon } from "@heroicons/react/24/solid";

interface HomeGroupsProps {
  groups: Group[];
}

const HomeGroups: FC<HomeGroupsProps> = ({ groups }) => {
  return (
    <div className="flex h-screen h-full w-full flex-col justify-between">
      <div className="h-full w-full space-y-10 px-2">
        <div className="flex w-full justify-between">
          <Heading order="6">Groups</Heading>
          <Link to="/home/groups/new">
            <PlusIcon className="h-6 w-6 hover:via-violet-500" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 overflow-scroll md:grid-cols-3">
          {groups?.map((group) => (
            <HomeGroup
              title={group.title}
              description={group.description}
              id={group.id}
              key={group.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeGroups;
