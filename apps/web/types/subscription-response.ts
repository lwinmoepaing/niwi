export interface SubscriptionResponse {
  id: string;
  email: string | null;
  status: string;
  amountPaid: number;
  currency: string;
  stripeUserId: string;
  subscriptionId: string;
  planId: string;
  userId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
