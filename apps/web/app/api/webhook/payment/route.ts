import { responseAPI } from "@/libs/response/response-helper";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const secretKey = (process.env.STRIPE_SECRET_KEY as string) || "";
const webHookKey = (process.env.STRIPE_WEBHOOK_KEY as string) || "";

const stripe = new Stripe(secretKey, {
  apiVersion: "2024-06-20",
});

type Params = { params: { something: string } };

export async function POST(request: NextRequest, { params }: Params) {
  try {
    console.log(params);

    if (!secretKey) {
      return responseAPI({
        message: "Payment Key is not found",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    const payload = await request.text();
    const response = JSON.parse(payload);
    const signature = request.headers.get("Stripe-Signature");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dateTime = new Date(response?.created * 1000).toLocaleDateString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timeString = new Date(response?.created * 1000).toLocaleDateString();
    const event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      webHookKey
    );

    return responseAPI({
      message: "Ok",
      statusCode: StatusCodes.OK,
      data: {
        type: event.type,
      },
    });
  } catch (_e) {
    return responseAPI({
      message: (_e as Error)?.message || "Something went wrong",
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
}
