import Button from "@/components/niwi-ui/button/button";
import { auth } from "@/libs/auth/next-auth";
import Link from "next/link";
import SignOutButton from "./(feat)/auth/assets/components/SignOutButton";
import NiwiSubscribeCardList from "@/components/niwi-payment/niwi-subscribe-card-list";
import {
  checkAvailableSubscription,
  getSubscribeData,
} from "@/feats/payment/services/payment.service";

export default async function HomePage() {
  const session = await auth();
  const isAvailableSubscription = checkAvailableSubscription();

  let subscribeData = null;
  if (session?.user?.id) {
    subscribeData = await getSubscribeData(session?.user?.id);
  }

  return (
    <main className={"h-screen font-bold overflow-x-hidden"}>
      <section className="w-full max-w-[800px] mx-auto py-20 text-center">
        <div className="text-center mb-5">
          <h1 className="text-8xl niwi-logo-text">Niwi Starter</h1>
        </div>

        {!session ? (
          <>
            <Link href="/auth/login">
              <Button>Login</Button>
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

      <section>{JSON.stringify(subscribeData)}</section>
      {isAvailableSubscription ? (
        <NiwiSubscribeCardList user={session?.user} />
      ) : null}
    </main>
  );
}
