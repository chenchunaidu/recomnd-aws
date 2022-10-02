import type { Group } from "~/models/group.server";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../common/button";
import Text from "../common/text";
import HomeGroup from "./group";
import { UserGroupIcon } from "@heroicons/react/24/outline";

interface HomeGroupsProps {
  groups: Group[];
  showEmptyCardsMsg?: boolean;
}

const HomeGroups: FC<HomeGroupsProps> = ({ groups, showEmptyCardsMsg }) => {
  if (!groups?.length) {
    if (showEmptyCardsMsg) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
          <UserGroupIcon className="h-32 w-32 font-thin text-gray-700"></UserGroupIcon>
          <Text>Fill up this space with your groups</Text>
          <Link to="/home/groups/new">
            <Button>Add your first group</Button>
          </Link>
        </div>
      );
    }
    return <div></div>;
  }

  return (
    <div>
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
  );
};

export default HomeGroups;
