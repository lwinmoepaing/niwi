import { z } from "zod";

export const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, "Subscription is required"),
  userId: z.string().min(1, "UserID is required"),
});

export type CancelSubscriptionValues = z.infer<typeof cancelSubscriptionSchema>;
