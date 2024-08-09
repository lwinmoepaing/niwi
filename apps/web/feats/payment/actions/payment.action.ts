"use server";

import { auth } from "@/libs/auth/next-auth";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import Stripe from "stripe";
import {
  cancelSubscriptionPayment,
  getSubscriptonById,
} from "../services/payment.service";
import {
  CancelSubscriptionValues,
  cancelSubscriptionSchema,
} from "../validations/payment.validation";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export const cancelSubscriptionAction = async (
  _currentState: unknown,
  data: CancelSubscriptionValues
) => {
  try {
    const { error, data: subData } = cancelSubscriptionSchema.safeParse(data);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const authorId = session.user.id;

    const subscription = await getSubscriptonById(subData.subscriptionId);
    if (!subscription)
      return responseError("This subscription data is not found");

    if (subscription.userId !== authorId)
      return responseError("No permission to cancel this subscription.");

    const cancel = await stripe.subscriptions.cancel(
      subscription.subscriptionId
    );

    if (cancel) {
      await cancelSubscriptionPayment({
        subscriptionId: subData.subscriptionId,
      });

      revalidatePath("/dashboard/payments");
    }

    return responseSuccess("Successfully cancel subscription.");
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};
