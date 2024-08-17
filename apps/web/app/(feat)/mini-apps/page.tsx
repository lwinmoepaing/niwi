import Button from "@/components/niwi-ui/button/button";
import { getSeoTag } from "@/libs/seo/seo";
import Link from "next/link";

export const metadata = getSeoTag({
  title: "Mini App",
  description:
    "Niwi Starter is a comprehensive, easy-to-use template for rapidly bootstrapping a Next.js application with essential features like authentication, blog management, email integration, database pre-seeding, and more. 🎉",
});


function MiniAppPage() {
  return (
    <>
      <section className="w-full max-w-[760px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/">
          <Button variant={"niwi"}>Go Back Home</Button>
        </Link>
      </section>
      <section className="max-w-[760px] mx-auto px-[20px] mb-8">
        <h1>Mini App Page</h1>

        <div className="mt-[20px]">
          <Link href="/mini-apps/todo" className="mr-[10px]">
            <Button variant={"niwi"}>Todo App</Button>
          </Link>

          <Link href="/mini-apps/pomodoro">
            <Button variant={"niwi"}>Pomodoro App</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
export default MiniAppPage;
