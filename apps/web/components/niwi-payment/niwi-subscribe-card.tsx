"use client";

import config from "@/config";
import axiosClient from "@/libs/api/axios-client";
import { cn } from "@/libs/utils";
import { NiwiSubscriptionCardType } from "@/types/blog-response";
import { loadStripe } from "@stripe/stripe-js";
import { CircleCheck } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import Button from "../niwi-ui/button/button";

const stripePromise = config.payment.stripePubKey
  ? loadStripe(config.payment.stripePubKey)
  : null;

type NiwiSubscribeCardProps = {
  item: NiwiSubscriptionCardType;
  isYearly: boolean;
  user?: User;
};

function NiwiSubscribeCard({
  user,
  item: subscribe,
  isYearly,
}: NiwiSubscribeCardProps) {
  const router = useRouter();

  const onHandleButtonClick = useCallback(async () => {
    if (subscribe?.onClickCallback) {
      subscribe.onClickCallback();
      return;
    }

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!user.email) {
      toast.error("You need to fill email address on your profile first");
      return;
    }

    if (!subscribe.paymentIdYearly && !subscribe.paymentIdMonthly) {
      toast.error("You need setup paymentID.");
      return;
    }

    try {
      const { data } = await axiosClient.post(
        `${config.domainUrl}/api/payment/payment-check-out`,
        {
          userId: user?.id,
          email: user?.email,
          priceId: isYearly
            ? subscribe.paymentIdYearly
            : subscribe.paymentIdMonthly,
          subscription: true,
        }
      );

      if (data.sessionId) {
        const stripe = await stripePromise;
        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
        return response;
      } else {
        console.error("Failed to create checkout session");
        toast("Failed to create checkout session");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }, [subscribe, isYearly]);

  return (
    <section
      className={cn(
        "w-[260px] lg:w-[230px] relative transition-all niwi-subscribe-card",
        subscribe.position === "top" ? "lg:top-[-10px]" : ""
      )}
    >
      <div
        className={cn(
          "relative sub-container",
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
          <h2 className="text-3xl">
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

        <p className="font-normal text-xs pt-2 pb-5">{subscribe.description}</p>

        <div className="pl-6 pb-6 pr-2 pt-0 flex flex-col gap-2">
          {subscribe.serviceList.map((service, i) => (
            <div
              className="flex gap-2 relative text-xs font-normal"
              key={`${service}_${i}`}
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
