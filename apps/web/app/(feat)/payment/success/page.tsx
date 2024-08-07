import Button from "@/components/niwi-ui/button/button";
import Link from "next/link";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _session = searchParams?.session_id
    ? await stripe.checkout.sessions.retrieve(
        (searchParams?.session_id as string) || ""
      )
    : "";
  // const jsonString = JSON.stringify(session, null, 2);
  // console.log(jsonString);

  return (
    <main className="flex min-w-screen flex-col items-center justify-between mt-32">
      <h1 className="mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome to Niwi Subscription 🎉
      </h1>
      <p className="leading-7 text-center w-[60%]">Let&apos;s get cooking</p>
      <div className="flex flex-row gap-x-[10px]">
        <Link href="/dashboard" className="mt-4">
          <Button>Access Dashboard</Button>
        </Link>
        <Link href="/" className="mt-4">
          <Button variant={"outline"}>Home</Button>
        </Link>
      </div>
    </main>
  );
}
