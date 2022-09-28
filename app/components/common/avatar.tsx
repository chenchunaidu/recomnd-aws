import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "./image";
import type { ImageProps } from "./image";

interface AvatarProps extends ImageProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizes = {
  xs: "md:h-6 md:w-6",
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-10 w-10 md:h-16 md:w-16",
  xl: "h-12 w-12 md:h-24 md:w-24",
  "2xl": "h-48 w-48",
};

const Avatar: React.FC<AvatarProps> = ({
  className,
  size = "md",
  ...props
}) => {
  if (!props.src) {
    return (
      <div
        className={twMerge(
          "rounded-full bg-gradient-to-r from-violet-600 via-violet-900 to-orange-500",
          sizes[size],
          className
        )}
      ></div>
    );
  }
  return (
    <Image
      className={twMerge("rounded-full", sizes[size], className)}
      {...props}
    />
  );
};

export default Avatar;
