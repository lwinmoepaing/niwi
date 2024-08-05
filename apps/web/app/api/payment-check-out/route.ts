import config from "@/config";
import { responseAPI } from "@/libs/response/response-helper";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const { userId, email, priceId, subscription } = await req.json();

  if (subscription) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId, email, subscription },
        mode: "subscription",
        success_url: `${config.domainUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.domainUrl}/payment/cancel`,
        allow_promotion_codes: true,
      });

      return responseAPI({
        message: "Successfully Updated",
        statusCode: StatusCodes.OK,
        data: {
          sessionId: session.id,
        },
      });
    } catch (error) {
      return responseAPI({
        message: (error as Error).message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  } else {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId, email, subscription },
        mode: "payment",
        success_url: `${config.domainUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.domainUrl}/payment/cancel`,
      });

      return responseAPI({
        message: "Successfully Updated",
        statusCode: StatusCodes.OK,
        data: {
          sessionId: session.id,
        },
      });
    } catch (error) {
      return responseAPI({
        message: (error as Error).message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
