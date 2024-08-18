import Button from "@/components/niwi-ui/button/button";
import Link from "next/link";
import { getSeoTag } from "@/libs/seo/seo";
import PreviewScreenshot from "./assets/components/preview-screenshot";

export const metadata = getSeoTag({
  title: "Preview Screenshot",
  description:
    "Niwi Starter is a comprehensive, easy-to-use template for rapidly bootstrapping a Next.js application with essential features like authentication, blog management, email integration, database pre-seeding, and more. 🎉",
});

function ScreenshotPage() {
  return (
    <>
      <section className="w-full max-w-[760px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/mini-apps">
          <Button variant={"niwi"}>Go Mini Apps</Button>
        </Link>
      </section>
      <section className="max-w-[760px] mx-auto px-[20px] mb-8 ">
        <div className="mt-[20px] p-[10px] md:p-[20px] bg-white dark:bg-[#111119] rounded-xl">
          <PreviewScreenshot />
        </div>
      </section>
    </>
  );
}

export default ScreenshotPage;
