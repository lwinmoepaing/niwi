"use client";

import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

type StatusType = "Draft" | "Publish" | "Bookmark";

type NiwiBlogDraftPublishSwitcherProps = {
  onChangeStatus: (status: StatusType) => void;
};

function NiwiBlogDraftPublishSwitcher({
  onChangeStatus,
}: NiwiBlogDraftPublishSwitcherProps) {
  const [status, setStatus] = useState<StatusType>("Draft");

  useEffect(() => {
    onChangeStatus(status);
  }, [status]);

  return (
    <div className="relative border rounded-full px-1 text-[14px] dark:border-[#1d1f23]">
      <div
        className={cn(
          "absolute w-[33.33%] h-[90%] top-[1px] bg-white dark:bg-[#111216]  rounded-full",
          "transition-all duration-[500ms] ease-in-out shadow-sm niwi-blog-switcher-animation",
          status === "Draft"
            ? "left-[2px] forward"
            : status === "Publish"
              ? "left-[33%] forward"
              : "left-[66%] forward"
        )}
      ></div>

      <button
        type="button"
        className={cn(
          "w-[76px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Draft" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Draft")}
      >
        Draft
      </button>
      <button
        type="button"
        className={cn(
          "w-[76px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Publish" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Publish")}
      >
        Publish
      </button>
      <button
        type="button"
        className={cn(
          "w-[76px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Bookmark" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Bookmark")}
      >
        Bookmark
      </button>
    </div>
  );
}
export default NiwiBlogDraftPublishSwitcher;
