import Button from "@/components/niwi-ui/button/button";
import Link from "next/link";
import QrCodeContainer from "./assets/components/qrcode-container";

import { getSeoTag } from "@/libs/seo/seo";

export const metadata = getSeoTag({
  title: "Qr Code",
  description:
    "Niwi Starter is a comprehensive, easy-to-use template for rapidly bootstrapping a Next.js application with essential features like authentication, blog management, email integration, database pre-seeding, and more. 🎉",
});

function PomodoroPage() {
  return (
    <>
      <section className="w-full max-w-[760px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/mini-apps">
          <Button variant={"niwi"}>Go Mini Apps</Button>
        </Link>
      </section>
      <section className="max-w-[760px] mx-auto px-[20px] mb-8 ">
        <div className="mt-[20px] px-[10px] md:px-[20px] py-12 bg-white dark:bg-[#111119] rounded-xl">
          <QrCodeContainer />
        </div>
      </section>
    </>
  );
}
export default PomodoroPage;
