import "server-only";

import prismaClient from "@/libs/db/prismaClient";
import config from "@/config";

export type CreateSubscriptionPaymentProps = {
  email: string;
  status: string;
  amountPaid: number;
  currency: string;
  stripeUserId: string;
  subscriptionId: string;
  planId: string;
  userId: string;
  startDate?: Date;
  endDate?: Date;
};

export const createSubscriptionPayment = async (
  props: CreateSubscriptionPaymentProps
) => {
  const { userId, ...rest } = props;
  return prismaClient.subscription.create({
    data: {
      ...rest,
      userId: userId ? userId : undefined,
    },
  });
};

export const updateSubscriptionPayment = async (
  props: CreateSubscriptionPaymentProps
) => {
  const { subscriptionId, email, userId, ...rest } = props;
  return prismaClient.subscription.update({
    data: {
      ...rest,
      userId: userId ? userId : undefined,
      email: email ? email : undefined,
    },
    where: {
      subscriptionId,
    },
  });
};

export const checkAvailableSubscription = () => {
  const payment = config.payment;

  return (
    payment.basicMonthlyPaymentKey &&
    payment.basicYearlyPaymentKey &&
    payment.stripePubKey
  );
};

export const getSubscribeData = (userId: string) => {
  return prismaClient.subscription.findFirst({
    where: { userId, status: "active" },
  });
};
