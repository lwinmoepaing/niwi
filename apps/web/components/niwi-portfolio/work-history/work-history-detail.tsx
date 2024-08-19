"use client";

import { cn } from "@/libs/utils";
import { PropsWithChildren, useState } from "react";

export const WorkHistoryDetail: React.FC<
  PropsWithChildren<{
    companyName: string;
    date: string;
    role: string;
    initialOpen?: boolean;
  }>
> = ({ date, role, companyName, children, initialOpen = false }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="flex-grow ml-4 items-center flex-col group my-1">
      <div className="flex flex-col" onClick={() => setOpen((prev) => !prev)}>
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
            {companyName}
            <span className="inline-flex gap-x-1"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                open ? "rotate-90" : ""
              )}
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </h3>
          <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
            {date}
          </div>
        </div>
        <div className="font-sans text-xs">{role}</div>
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
