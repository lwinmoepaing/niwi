import BorderShiner from "@/components/niwi-ui/border-shine/border-shine";
import Meteors from "@/components/niwi-ui/meteors/meteors";
import NiwiHero from "@/components/niwi-ui/niwi-hero/niwi-hero";
import { getBlogCountByAuthor } from "@/feats/blog/services/blog.service";
import { getSubscriptionCountByUserId } from "@/feats/payment/services/payment.service";
import { auth } from "@/libs/auth/next-auth";
import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import { notFound } from "next/navigation";

async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return notFound();

  const blogCount = await getBlogCountByAuthor(session?.user?.id);
  const paymentCount = await getSubscriptionCountByUserId(session?.user?.id);

  return (
    <div>
      <p className="dark:text-white">Protected Dashboard Page</p>

      <section className="flex flex-col lg:flex-row my-[20px] ">
        <div className="w-full lg:max-w-[70%] relative ">
          <div className="flex flex-col lg:flex-row relative mb-[20px] gap-[20px]">
            <BorderShiner
              className="relative w-full h-[120px] md:h-auto md:pt-[18%]"
              color={["#f43f5e", "#7e22ce", "#60a5fa"]}
              duration={40}
              borderRadius={16}
            >
              <span
                className={cn(
                  "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl text-center"
                )}
              >
                <span className="text-xl">{blogCount}</span>
                <br />
                <span className={lancelotFont.className}>Total Blog</span>
              </span>
            </BorderShiner>
            <BorderShiner
              className="relative w-full h-[120px] md:h-auto md:pt-[18%]"
              color={["#f43f5e", "#7e22ce", "#60a5fa"]}
              duration={40}
              borderRadius={16}
            >
              <span
                className={cn(
                  "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl text-center",
                  lancelotFont.className
                )}
              >
                <span className="text-3xl">{paymentCount}</span>
                <br />
                <span>Total Transaction</span>
              </span>
            </BorderShiner>
          </div>
          <div className="w-full relative rounded-[20px] overflow-hidden bg-white dark:bg-transparent">
            <Meteors number={15} />
            <NiwiHero />
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
