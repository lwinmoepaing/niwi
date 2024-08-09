"use client";

import Button from "@/components/niwi-ui/button/button";
import useCancelSubscription from "../hooks/useCancelSubscription";
import { CircleDashed } from "lucide-react";

function SubscriptionMenu({
  userId,
  subscriptionId,
}: {
  userId: string;
  subscriptionId: string;
  isBasicMonthly: boolean;
  isBasicYearly: boolean;
}) {
  const { pending, handleSubmit } = useCancelSubscription({
    userId,
    subscriptionId,
  });

  return (
    <div>
      <Button
        className="mx-[5px]"
        variant={"niwi"}
        size="sm"
        disabled={pending}
        onClick={() => {
          console.log("Click");
          handleSubmit();
        }}
      >
        {pending ? (
          <CircleDashed
            className="animate-spin text-[#ff4175] min-w-[78px]"
            size={14}
          />
        ) : (
          "Cancel Plan"
        )}
      </Button>
    </div>
  );
}
export default SubscriptionMenu;
