"use client";

import { NiwiSubscriptionCardType } from "@/types/blog-response";
import NiwiSubscribeCard from "./niwi-subscribe-card";
import { useCallback, useState } from "react";
import NiwiSubacribePlanSwitcher from "./niwi-subscribe-plan-switcher";
import config from "@/config";
import { User } from "next-auth";

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
    paymentIdMonthly: config.payment.basicMonthlyPaymentKey,
    paymentIdYearly: config.payment.basicYearlyPaymentKey,
    serviceList: [
      "Example Feature For Basic Plan",
      "This is another Feature for Basic",
      "This feature is amazing too",
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
    paymentIdMonthly: "",
    paymentIdYearly: "",
    serviceList: [
      "Super Customize Features 1",
      "Super Customize Features 2",
      "Super Customize Features 3",
      "Super Customize Features 4",
      "Super Customize Features 5",
    ],
    buttonTitle: "Get Started",
    position: "top",
  },
  {
    type: "Customize",
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
      "Super Customize Exclusive Features",
      "Support for your customizations",
      "24hour availability for your request",
      "Super Customize Features ",
    ],
    buttonTitle: "Contact Now!",
    position: "default",
    onClickCallback: () => {
      alert("Contact Now!");
    },
  },
] as NiwiSubscriptionCardType[];

function NiwiSubscribeCardList({ user }: { user?: User }) {
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

      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[20px] items-center lg:items-start justify-center mb-20">
        {subscribeList.map((subscribe) => (
          <NiwiSubscribeCard
            key={subscribe.type}
            item={subscribe}
            isYearly={paymentType === "Monthly" ? false : true}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
export default NiwiSubscribeCardList;
