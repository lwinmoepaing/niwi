"use client";

import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

type StatusType = "Draft" | "Publish";

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
    <div className="border rounded-full py-1 px-1 relative text-[14px] dark:border-[#1d1f23]">
      <div
        className={cn(
          "absolute w-[50%] h-[90%] top-[2px] bg-white dark:bg-[#1d1f23]  rounded-full",
          "transition-all duration-[500ms] ease-in-out shadow-sm niwi-blog-switcher-animation",
          status === "Draft" ? "left-[2px] forward" : "left-[48%] reverse"
        )}
      ></div>

      <button
        type="button"
        className={cn(
          "w-[68px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Draft" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Draft")}
      >
        Draft
      </button>
      <button
        type="button"
        className={cn(
          "w-[68px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Publish" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Publish")}
      >
        Publish
      </button>
    </div>
  );
}
export default NiwiBlogDraftPublishSwitcher;
