"use client";

import { NiwiSubscriptionCardType } from "@/types/blog-response";
import NiwiSubscribeCard from "./niwi-subscribe-card";
import { useCallback, useState } from "react";
import NiwiSubacribePlanSwitcher from "./niwi-subscribe-plan-switcher";

const subscribeList = [
  {
    type: "Basic",
    save: 0,
    monthlyPrice: 10,
    yearlyPrice: 100,
    yearlySave: "Save 20$",
    currency: "$",
    perMonthlyText: "/ month",
    perYearyText: "/ year",
    description: "Essential features you need to get started",
    serviceList: [
      "Hehe",
      "Example Feature Number 2 with blah blah blah",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
    ],
    buttonTitle: "Get Started",
    position: "default",
  },
  {
    type: "Pro",
    save: 0,
    monthlyPrice: 25,
    yearlyPrice: 250,
    yearlySave: "Save 50$",
    currency: "$",
    perMonthlyText: "/ month",
    perYearyText: "/ year",
    description: "Perfect for owners of small & medium businessess",
    serviceList: [
      "Hehe",
      "Example Feature Number 2 with blah blah blah",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
    ],
    buttonTitle: "Get Started",
    position: "top",
  },
  {
    type: "Enterprise",
    save: 0,
    customPrice: "Custom",
    monthlyPrice: 25,
    yearlyPrice: 250,
    yearlySave: "",
    currency: "$",
    perMonthlyText: "/ month",
    perYearyText: "/ year",
    description: "Dedicated support and infrastructure to fit your needs",
    serviceList: [
      "Hehe",
      "Example Feature Number 2 with blah blah blah",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
      "Super Customize Exclusive Features",
    ],
    buttonTitle: "Get Started",
    position: "default",
    onClickCallback: () => {
      alert("Hello");
    },
  },
] as NiwiSubscriptionCardType[];

function NiwiSubscribeCardList() {
  const [paymentType, setPaymentType] = useState<"Monthly" | "Yearly">(
    "Monthly"
  );

  const onChangeStatus = useCallback((status: "Monthly" | "Yearly") => {
    setPaymentType(status);
  }, []);

  return (
    <div className="w-full max-w-[880px] mx-auto pb-20">
      <div className="flex flex-row justify-center mb-[40px]">
        <NiwiSubacribePlanSwitcher onChangeStatus={onChangeStatus} />
      </div>

      <div className="flex flex-row flex-wrap gap-[20px] items-start justify-center mb-20">
        {subscribeList.map((subscribe) => (
          <NiwiSubscribeCard
            key={subscribe.type}
            item={subscribe}
            isYearly={paymentType === "Monthly" ? false : true}
          />
        ))}
      </div>
    </div>
  );
}
export default NiwiSubscribeCardList;
