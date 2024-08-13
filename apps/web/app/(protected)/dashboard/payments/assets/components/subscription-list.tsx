import config from "@/config";
import { SubscriptionResponse } from "@/types/subscription-response";
import SubscriptionMenu from "./subscription-menu";
import { cn } from "@/libs/utils";

function SubscriptionList({
  data,
  userId,
}: {
  data: SubscriptionResponse[];
  userId: string;
}) {
  return (
    <div>
      {data.map((subscription) => {
        const isActive = subscription.status === "active";
        const planId = subscription.planId;
        const isBasicMonthly = planId === config.payment.basicMonthlyPaymentKey;
        const isBasicYearly = planId === config.payment.basicYearlyPaymentKey;

        return (
          <div
            className="bg-white dark:bg-[#111119] rounded-[10px] my-2 p-[20px] gap-[10px] flex flex-col lg:flex-row justify-between items-center text-sm"
            key={subscription.id}
          >
            <div className="flex-1">
              {isBasicMonthly
                ? "Basic Monthly Subscription"
                : isBasicYearly
                  ? "Basic Yearly Subscription"
                  : ""}
            </div>
            <div className={cn("flex-1")}>
              <span className="border dark:border-[#4a4a4b] px-[10px] py-[4px] capitalize rounded ">
                {subscription.status}
              </span>
            </div>
            <div className="flex-1 flex lg:justify-end">
              {isActive && (
                <SubscriptionMenu
                  userId={userId}
                  subscriptionId={subscription.subscriptionId}
                  isBasicMonthly={isBasicMonthly}
                  isBasicYearly={isBasicYearly}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default SubscriptionList;
