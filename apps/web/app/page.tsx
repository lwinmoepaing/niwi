import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
import NiwiSubscribeCardList from "@/components/niwi-payment/niwi-subscribe-card-list";
import { BorderBeam } from "@/components/niwi-ui/border-beam/border-beam";
import Button from "@/components/niwi-ui/button/button";
import Faq from "@/components/niwi-ui/faq/faq";
import Footer from "@/components/niwi-ui/footer/footer";
import NiwiHero from "@/components/niwi-ui/niwi-hero/niwi-hero";
import {
  checkAvailableBlogs,
  getLast3Blogs,
} from "@/feats/blog/services/blog.service";
import {
  checkAvailableSubscription,
  getSubscribePlanByUserId,
} from "@/feats/payment/services/payment.service";
import { auth } from "@/libs/auth/next-auth";
import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import { PublishedBlog } from "@/types/blog-response";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  const isAvailableSubscription = checkAvailableSubscription();

  let subscribePlan = null;
  if (session?.user?.id) {
    subscribePlan = await getSubscribePlanByUserId(session?.user?.id);
  }

  const isAvailableBlogs = checkAvailableBlogs();
  let blogs: PublishedBlog[] = [];
  if (isAvailableBlogs) {
    blogs = await getLast3Blogs(session?.user?.id);
  }

  return (
    <main className={"h-screen overflow-x-hidden px-[20px] md:px-0"}>
      <section className="w-full max-w-[880px] mx-auto pt-20 text-center mb-10">
        <div className="mx-auto w-full my-5 relative rounded-[18px] bg-white dark:bg-transparent">
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
                <Button variant={"outline"}>Go to Dashboard</Button>
              </Link>
            </div>
          </>
        )}
      </section>

      {isAvailableBlogs ? (
        <section className="w-full max-w-[880px] mx-auto mt-[20px]">
          <div className="text-center">
            <h2
              className={cn(lancelotFont.className, "niwi-logo-text text-4xl ")}
            >
              Latest Blogs
            </h2>
          </div>
          {blogs.map((item) => (
            <NiwiBlogProfile
              key={item.id}
              blog={item}
              currentAuth={session?.user}
              isBookmark={(item._count?.blogBookmarks || 0) > 0 || false}
              isFavorite={
                item.userBlogReaction?.some(
                  (item) => item.reaction === "HEART"
                ) ?? false
              }
              commentCount={item._count?.blogComments || 0}
              showSetting={false}
            />
          ))}
        </section>
      ) : (
        <section className="max-w-[650px] mx-auto mb-8">
          <div className="relative niwi-subscribe-card">
            <div className="relative sub-container text-center">
              <p>
                <span
                  className={cn(
                    lancelotFont.className,
                    "niwi-logo-text text-2xl"
                  )}
                >
                  Blog Service
                </span>{" "}
                is not available.
              </p>
              <p>
                If you want to use it, please fill <b>DATABASE_URL</b> and seed
                data inside .env file.
              </p>
            </div>
          </div>
        </section>
      )}

      {isAvailableSubscription && !subscribePlan?.data ? (
        <>
          <div className="text-center mt-[40px]">
            <h2
              className={cn(
                lancelotFont.className,
                "niwi-logo-text text-4xl mb-[20px]"
              )}
            >
              Pricing
            </h2>
          </div>
          <NiwiSubscribeCardList user={session?.user} />
        </>
      ) : (
        <section className="max-w-[650px] mx-auto">
          <div className="relative niwi-subscribe-card">
            <div className="relative sub-container text-center">
              <p>
                <span
                  className={cn(
                    lancelotFont.className,
                    "niwi-logo-text text-2xl"
                  )}
                >
                  Payment Service
                </span>{" "}
                is not available.
              </p>
              <p>
                If you want to use it, please fill <b>payment IDs</b> inside
                .env file.
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

      <section className="w-full max-w-[1080px] mx-auto">
        <Faq />
      </section>

      <Footer />
    </main>
  );
}
