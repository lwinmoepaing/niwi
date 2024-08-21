import NiwiMiniAppsList from "@/components/niwi-mini-apps/niwi-mini-apps-list";
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
      <NiwiMiniAppsList />
      {/* <section className="max-w-[760px] mx-auto px-[20px] mb-8">
        <h1>Mini App Page</h1>

        <div className="mt-[20px] flex flex-row gap-x-[10px]">
          <Link href="/mini-apps/todo">
            <Button variant={"niwi"}>Todo App</Button>
          </Link>

          <Link href="/mini-apps/pomodoro">
            <Button variant={"niwi"}>Pomodoro App</Button>
          </Link>

          <Link href="/mini-apps/screenshot-url">
            <Button variant={"niwi"}>Preview Screenshot</Button>
          </Link>

          <Link href="/mini-apps/memory-game">
            <Button variant={"niwi"}>Memory Game</Button>
          </Link>

          <Link href="/mini-apps/tic-tac-toe">
            <Button variant={"niwi"}>Tic Tac Toe Game</Button>
          </Link>
        </div>
      </section> */}
    </>
  );
}
export default MiniAppPage;
