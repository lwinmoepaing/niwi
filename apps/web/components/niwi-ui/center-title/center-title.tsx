import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import React from "react";

function CenterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={cn(
        lancelotFont.className,
        "bg-white px-[30px] py-[4px] rounded-[12px] dark:bg-transparent inline-block text-4xl "
      )}
    >
      <span className="niwi-logo-text">{children}</span>
    </h2>
  );
}
export default CenterTitle;
