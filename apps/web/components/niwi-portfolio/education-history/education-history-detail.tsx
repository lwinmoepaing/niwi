"use client";

import { cn } from "@/libs/utils";
import { PropsWithChildren, useState } from "react";

export const EducationHistoryDetail: React.FC<
  PropsWithChildren<{
    name: string;
    date: string;
    message: string;
    initialOpen?: boolean;
  }>
> = ({ date, message, name, children, initialOpen = false }) => {
  const [open, setOpen] = useState(!children ? false : initialOpen);

  return (
    <div className="flex-grow ml-4 items-center flex-col group my-1">
      <div
        className="flex flex-col"
        onClick={() => {
          if (!children) return;
          setOpen((prev) => !prev);
        }}
      >
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
            {name}
            <span className="inline-flex gap-x-1"></span>
          </h3>
          <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
            {date}
          </div>
        </div>
        <div className="font-sans text-xs">{message}</div>
      </div>
      <div
        className={cn(
          "mt-2 text-xs sm:text-sm transition-[opacity] duration-200 ease-out ",
          open ? "opacity-100" : "opacity-0 h-0"
        )}
      >
        <div
          className={cn(
            "transition-all duration-200 ease-out",
            open ? "translate-y-1" : "translate-y-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
