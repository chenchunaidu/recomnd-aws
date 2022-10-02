import type { Group } from "~/models/group.server";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import React from "react";

interface HomeGroupProps extends Group {
  link?: string;
}

const HomeGroup: FC<Omit<HomeGroupProps, "userId">> = ({
  title,
  description,
  id,
  link,
}) => {
  return (
    <div className="space-y-1 rounded-md bg-violet-200 p-4">
      <Link to={`${link}/${id}`}>
        <div className="text-lg font-semibold text-violet-700">{title}</div>
        <div className="text-sm text-violet-600 line-clamp-4">
          {description}
        </div>
      </Link>
    </div>
  );
};

export default HomeGroup;
