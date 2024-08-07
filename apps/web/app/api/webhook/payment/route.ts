import config from "@/config";
import {
  createSubscriptionPayment,
  CreateSubscriptionPaymentProps,
  updateSubscriptionPayment,
} from "@/feats/payment/services/payment.service";
import { responseAPI } from "@/libs/response/response-helper";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const secretKey = (process.env.STRIPE_SECRET_KEY as string) || "";
const webHookKey = (process.env.STRIPE_WEBHOOK_KEY as string) || "";

const stripe = new Stripe(secretKey, {
  apiVersion: "2024-06-20",
});

type handleSubscriptionEventType = "created" | "updated" | "deleted";
const handleSubscriptionEvent = async (
  event: Stripe.Event,
  type: handleSubscriptionEventType
) => {
  try {
    const subscription = event.data.object as Stripe.Subscription;

    showPaymentLog({ isStart: true, type });

    const priceAmount =
      (subscription.items?.data[0]?.price?.unit_amount || 100) / 100 || 0;

    const subscriptionData: CreateSubscriptionPaymentProps = {
      subscriptionId: subscription.id,
      stripeUserId: subscription.customer as string,
      status: subscription.status,
      startDate: new Date(subscription.created * 1000),
      planId: subscription.items?.data[0]?.price.id || "",
      userId: subscription.metadata?.userId || "",
      email: subscription.metadata?.email || "",
      amountPaid: priceAmount,
      currency: "usd",
    };

    if (type === "created") {
      showPaymentLog({ message: "Created Func", isCalledFunc: true });
      const newSubscription = await createSubscriptionPayment(subscriptionData);
      return responseAPI({
        message: "Ok",
        statusCode: StatusCodes.OK,
        data: newSubscription,
      });
    }

    if (type === "updated" && subscription.metadata?.email) {
      showPaymentLog({ message: "Updated Func", isCalledFunc: true });
      const newSubscription = await updateSubscriptionPayment(subscriptionData);
      return responseAPI({
        message: "Ok",
        statusCode: StatusCodes.OK,
        data: newSubscription,
      });
    }

    if (type === "deleted") {
      showPaymentLog({ message: "Deleted Func", isCalledFunc: true });
      const newSubscription = await updateSubscriptionPayment({
        ...subscriptionData,
        status: "cancelled",
      });
      return responseAPI({
        message: "Ok",
        statusCode: StatusCodes.OK,
        data: newSubscription,
      });
    }

    return responseAPI({
      message: "All the skip event type",
      statusCode: StatusCodes.OK,
      data: {},
    });
  } catch (_e) {
    console.log((_e as Error)?.message);
    return responseAPI({
      message: (_e as Error)?.message || "Something went wrong",
      statusCode: StatusCodes.NOT_FOUND,
    });
  } finally {
    showPaymentLog({ isFinished: true, type });
  }
};

const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  try {
    const session = event.data.object as Stripe.Checkout.Session;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata: any = session?.metadata;

    showPaymentLog({ isStart: true, type: "Session Completed" });

    if (metadata?.subscription === "true") {
      const subscriptionId = session.subscription;
      try {
        await stripe.subscriptions.update(subscriptionId as string, {
          metadata,
        });

        return responseAPI({
          message: "Subscription metadata updated successfully",
          statusCode: StatusCodes.NOT_FOUND,
        });
      } catch (_e) {
        console.error("Error updating subscription metadata:", _e);
        return responseAPI({
          message: (_e as Error)?.message || "Something went wrong",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
    }
    // When you want to implement without subscription
    return responseAPI({
      message: "Ok",
      statusCode: StatusCodes.OK,
      data: {
        type: event.type,
      },
    });
  } catch (e) {
    console.log(e);
    return responseAPI({
      message: (e as Error)?.message || "Something went wrong",
      statusCode: StatusCodes.NOT_FOUND,
    });
  } finally {
    console.log("========================================");
    console.log("Finished: Trigger Handle Checkout Session Complete");
    console.log("========================================\n");
  }
};

const handleRefund = () => {
  // handleRefund
};

type Params = { params: { something: string } };

export async function POST(request: NextRequest, { params: _params }: Params) {
  try {
    if (!secretKey) {
      return responseAPI({
        message: "Payment Key is not found",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    const payload = await request.text();
    const signature = request.headers.get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      webHookKey
    );

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);
      case "charge.refunded":
        return handleRefund();
      // case "invoice.payment_succeeded":
      // case "invoice.payment_failed":
      default:
        return responseAPI({
          message: "Ok",
          statusCode: StatusCodes.OK,
          data: {
            type: event.type,
          },
        });
    }
  } catch (_e) {
    console.log(_e);
    return responseAPI({
      message: (_e as Error)?.message || "Something went wrong",
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
}

const showPaymentLog = ({
  isStart,
  isFinished,
  isCalledFunc,
  message,
  type,
}: {
  isStart?: boolean;
  isFinished?: boolean;
  isCalledFunc?: boolean;
  message?: string;
  type?: string;
}) => {
  if (!config.payment.showLog) return;

  if (isStart) {
    console.log("=================================");
    console.log("Trigger Handle Subscription");
    console.log("Type: " + type);
    console.log("=================================");
  }

  if (isFinished) {
    console.log("========================================");
    console.log("Finished: Trigger Handle Subscription", type);
    console.log("========================================\n");
  }

  if (isCalledFunc) {
    console.log("Trigger -> " + message);
  }
};
