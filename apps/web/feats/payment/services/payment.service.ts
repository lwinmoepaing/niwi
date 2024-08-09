import "server-only";

import prismaClient from "@/libs/db/prismaClient";
import config from "@/config";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { generateMetaForPagination } from "@/libs/utils";

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

export const getSubscriptonById = async (subscriptionId: string) => {
  return prismaClient.subscription.findFirst({
    where: { subscriptionId },
  });
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

export const getSubscribePlanByUserId = async (userId: string) => {
  try {
    const subscription = await prismaClient.subscription.findFirst({
      where: { userId, status: "active" },
    });

    if (!subscription) {
      return responseError("Not found Subscription");
    }

    return responseSuccess("Successfully get subscription value", {
      planType:
        subscription.planId === config.payment.basicMonthlyPaymentKey ||
        subscription.planId === config.payment.basicYearlyPaymentKey
          ? "Basic Plan"
          : "Pro Plan",
    });
  } catch (e) {
    return responseError((e as Error).message);
  }
};

export const cancelSubscriptionPayment = async (props: {
  subscriptionId: string;
}) => {
  return prismaClient.subscription.update({
    data: {
      status: "cancelled",
    },
    where: {
      subscriptionId: props.subscriptionId,
    },
  });
};

type GetSubscriptionDataByUserIdProps = {
  page: number;
  userId: string;
};

export const getSubscriptionDataByUserId = async ({
  page,
  userId,
}: GetSubscriptionDataByUserIdProps) => {
  const LIMIT_COUNT = 10 as const;
  const skip = (page - 1) * LIMIT_COUNT;

  const totalCount = await prismaClient.subscription.count({
    where: {
      userId,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

  const subscriptionList = await prismaClient.subscription.findMany({
    skip: skip,
    take: LIMIT_COUNT,
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const meta = generateMetaForPagination({ page, totalPages });

  return {
    meta,
    data: subscriptionList,
  };
};
