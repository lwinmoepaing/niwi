"use client";

import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

type PlanType = "Monthly" | "Yearly";

type NiwiSubacribePlanSwitcherProps = {
  onChangeStatus: (status: PlanType) => void;
};

function NiwiSubacribePlanSwitcher({
  onChangeStatus,
}: NiwiSubacribePlanSwitcherProps) {
  const [status, setStatus] = useState<PlanType>("Monthly");

  useEffect(() => {
    onChangeStatus(status);
  }, [status]);

  return (
    <div className="relative border rounded-full py-1 px-1 text-[14px] dark:border-[#1d1f23]">
      <div
        className={cn(
          "absolute w-[50%] h-[90%] top-[2px] bg-white dark:bg-[#111216]  rounded-full",
          "transition-all duration-[500ms] ease-in-out shadow-sm niwi-blog-switcher-animation",
          status === "Monthly" ? "left-[2px] forward" : "left-[49%] forward"
        )}
      />

      <button
        type="button"
        className={cn(
          "w-[76px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Monthly" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Monthly")}
      >
        Montly
      </button>

      <button
        type="button"
        className={cn(
          "w-[76px] mx-[2px] my-[2px] text-center relative transition-all duration-200 ease-in-out niwi-blog-switcher-animation",
          status === "Yearly" ? "niwi-logo-text font-bold forward" : ""
        )}
        onClick={() => setStatus("Yearly")}
      >
        Yearly
      </button>
    </div>
  );
}

export default NiwiSubacribePlanSwitcher;
