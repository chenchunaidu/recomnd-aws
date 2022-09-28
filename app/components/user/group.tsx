import type { FC } from "react";
import React from "react";
import type { CardProps } from "./card";
import Cards from "./cards";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Button from "../common/button";
interface GroupProps {
  id: string;
  title: string;
  description: string;
  recommendations: CardProps[];
  view: "grid" | "flex";
}

const Group: FC<GroupProps> = ({
  title,
  description,
  recommendations,
  id,
  view = "grid",
}) => {
  return (
    <div className="space-y-4 px-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-2xl text-slate-800">{title}</div>
          <div className="text-sm text-slate-500">{description}</div>
        </div>
        <div className="flex space-x-2">
          <Button className=" md:px-2.5 hover:text-white" variant="link">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div
        className={
          view === "flex"
            ? `flex space-x-8 overflow-x-scroll snap-x snap-mandatory`
            : "grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2 md:gap-3 lg:gap-4 "
        }
      >
        <Cards cards={recommendations} />
      </div>
    </div>
  );
};

export default Group;
export type { GroupProps };
