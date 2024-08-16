import Button from "@/components/niwi-ui/button/button";
import { getSeoTag } from "@/libs/seo/seo";
import Link from "next/link";

export const metadata = getSeoTag({
  title: "Payment Cancelled",
  description: "The good news is, you can try again 😊",
});

export default function Cancel() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between mt-32">
      <h1 className="my-3 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Payment Cancelled 😢
      </h1>
      <p className="leading-7">The good news is, you can try again 😊</p>
      <div className="mt-5">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
      </div>
    </main>
  );
}
