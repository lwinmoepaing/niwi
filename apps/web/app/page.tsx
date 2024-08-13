import Button from "@/components/niwi-ui/button/button";
import { auth } from "@/libs/auth/next-auth";
import NiwiHero from "@/components/niwi-ui/niwi-hero/niwi-hero";
import Link from "next/link";
import SignOutButton from "./(feat)/auth/assets/components/SignOutButton";
import NiwiSubscribeCardList from "@/components/niwi-payment/niwi-subscribe-card-list";
import {
  checkAvailableSubscription,
  getSubscribePlanByUserId,
} from "@/feats/payment/services/payment.service";
import { BorderBeam } from "@/components/niwi-ui/border-beam/border-beam";

export default async function HomePage() {
  const session = await auth();
  const isAvailableSubscription = checkAvailableSubscription();

  let subscribePlan = null;
  if (session?.user?.id) {
    subscribePlan = await getSubscribePlanByUserId(session?.user?.id);
  }

  return (
    <main className={"h-screen overflow-x-hidden px-[20px] md:px-0"}>
      <section className="w-full max-w-[800px] mx-auto pt-20 text-center mb-10">
        <div className="mx-auto max-w-[650px] my-5 relative rounded-[10px]">
          <BorderBeam duration={5} size={170} />
          <NiwiHero />
        </div>

        {!session ? (
          <>
            <Link href="/auth/login">
              <Button variant={"niwi"}>Login</Button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-x-[16px] justify-center">
              <Link href="/dashboard">
                <Button variant={"outline"}>Dashboard</Button>
              </Link>
              <SignOutButton />
            </div>
          </>
        )}
      </section>

      {isAvailableSubscription && !subscribePlan?.data ? (
        <NiwiSubscribeCardList user={session?.user} />
      ) : (
        <section className="max-w-[650px] mx-auto">
          <div className="relative niwi-subscribe-card">
            <div className="relative sub-container text-center">
              <p>Payment Service is not available.</p>
              <p>
                If you want to use it, please fill payment IDs inside .env file.
              </p>
            </div>
          </div>
        </section>
      )}

      {subscribePlan?.success && subscribePlan.data ? (
        <section className="max-w-[650px] mx-auto">
          <div className="relative niwi-subscribe-card">
            <div className="relative sub-container text-center">
              Thank you, You are currently using with{" "}
              {subscribePlan.data.planType}.
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
