import { getSubscriptionDataByUserId } from "@/feats/payment/services/payment.service";
import { auth } from "@/libs/auth/next-auth";
import { notFound } from "next/navigation";
import SubscriptionList from "./assets/components/subscription-list";
import NiwiEmptyPayment from "@/components/niwi-payment/niwi-empty-payment";

async function BlogsLandingPage() {
  const session = await auth();
  if (!session?.user?.id) return notFound();

  const userId = session?.user?.id;
  const subscription = await getSubscriptionDataByUserId({ page: 1, userId });

  return (
    <section>
      <h1>Payment</h1>
      <NiwiEmptyPayment />
      <SubscriptionList data={subscription.data} userId={userId} />
    </section>
  );
}
export default BlogsLandingPage;
