"use client";

import * as React from "react";
import { cn } from "@/libs/utils";

type AvatarPropsType = {
  ref?: React.RefObject<HTMLDivElement>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const Avatar = ({ ref, className, ...props }: AvatarPropsType) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
);

export default Avatar;
