import type { FC } from "react";
import React from "react";
import type { CardProps } from "./card";
import Cards from "./cards";
import { EllipsisHorizontalIcon, ShareIcon } from "@heroicons/react/24/solid";
import Button from "../common/button";
import CopyToClipBoardButton from "../common/copy-to-clipboard";
interface GroupProps {
  id: string;
  title: string;
  description: string;
  recommendations: CardProps[];
  groupLink?: string;
  view: "grid" | "flex";
  isAdmin?: boolean;
}

const Group: FC<GroupProps> = ({
  title,
  description,
  recommendations,
  id,
  groupLink,
  isAdmin = false,
}) => {
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-800">{title}</div>
          <div className="text-sm text-slate-500">{description}</div>
        </div>
        {isAdmin ? (
          <div className="flex space-x-2">
            <Button className=" hover:text-white md:px-2.5" variant="link">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </Button>
            <CopyToClipBoardButton copyText={groupLink || ""}>
              <ShareIcon className="h-5 w-5" />
            </CopyToClipBoardButton>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Cards cards={recommendations} />
    </div>
  );
};

export default Group;
export type { GroupProps };
