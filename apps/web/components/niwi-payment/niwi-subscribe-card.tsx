import { cn } from "@/libs/utils";
import { NiwiSubscriptionCardType } from "@/types/blog-response";
import { CircleCheck } from "lucide-react";
import { useCallback } from "react";
import Button from "../niwi-ui/button/button";

type NiwiSubscribeCardProps = {
  item: NiwiSubscriptionCardType;
  isYearly: boolean;
};

function NiwiSubscribeCard({
  item: subscribe,
  isYearly,
}: NiwiSubscribeCardProps) {
  const onHandleButtonClick = useCallback(() => {
    if (subscribe?.onClickCallback) {
      subscribe.onClickCallback();
      return;
    }
  }, []);

  return (
    <section
      className={cn(
        "w-[280px] relative transition-all niwi-subscribe-card",
        subscribe.position === "top" ? "top-[-10px]" : ""
      )}
    >
      <div
        className={cn(
          "relative container",
          subscribe.position === "top" ? "" : ""
        )}
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-normal mb-2">{subscribe.type}</h1>
          {isYearly && subscribe?.yearlySave ? (
            <span className="save-button">{subscribe?.yearlySave}</span>
          ) : null}
        </div>

        <div className="flex items-end gap-0.5 mb-1">
          <h2 className="text-4xl">
            {subscribe?.customPrice ? (
              <>{subscribe.customPrice}</>
            ) : (
              <>
                {isYearly ? subscribe.yearlyPrice : subscribe.monthlyPrice}
                {subscribe.currency}
                <span className="">
                  {isYearly ? subscribe.perYearyText : subscribe.perMonthlyText}
                </span>
              </>
            )}
          </h2>
        </div>

        <p className="font-normal text-sm pt-2 pb-5">{subscribe.description}</p>

        <div className="pl-6 pb-6 pr-2 pt-0 flex flex-col gap-2">
          {subscribe.serviceList.map((service) => (
            <div
              className="flex gap-2 relative text-xs font-normal"
              key={service}
            >
              <CircleCheck
                size={14}
                className="w-[14px] h-14px] absolute top-[2px] left-[-20px] text-green-600 dark:text-green-400"
              />
              {service}
            </div>
          ))}
        </div>

        <Button
          className="block w-full"
          type="button"
          onClick={onHandleButtonClick}
        >
          {subscribe.buttonTitle}
        </Button>
      </div>
    </section>
  );
}
export default NiwiSubscribeCard;
