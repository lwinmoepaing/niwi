import "server-only";

import prismaClient from "@/libs/db/prismaClient";

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
  return await prismaClient.subscription.create({
    data: {
      ...rest,
      userId: userId ? userId : undefined,
    },
  });
};

export const updateSubscriptionPayment = async (
  props: CreateSubscriptionPaymentProps
) => {
  const { subscriptionId, userId, ...rest } = props;
  return await prismaClient.subscription.update({
    data: {
      ...rest,
      userId: userId ? userId : undefined,
    },
    where: {
      subscriptionId,
    },
  });
};
