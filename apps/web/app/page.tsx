import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
import NiwiEmptyBlog from "@/components/niwi-blog/niwi-blog-profile/niwi-empty-blog";
import HeroSection from "@/components/niwi-portfolio/hero/hero-section";
import WorkHistory from "@/components/niwi-portfolio/work-history/work-history";
import CenterTitle from "@/components/niwi-ui/center-title/center-title";
import Faq from "@/components/niwi-ui/faq/faq";
import Footer from "@/components/niwi-ui/footer/footer";
import {
  checkAvailableBlogs,
  getLast3Blogs,
} from "@/feats/blog/services/blog.service";
import { auth } from "@/libs/auth/next-auth";
import { lancelotFont } from "@/libs/font/font-helper";
import { getSeoTag } from "@/libs/seo/seo";
import { cn } from "@/libs/utils";
import { PublishedBlog } from "@/types/blog-response";

export const metadata = getSeoTag({
  title: "Learn Fast, Build Fast, Ship Fast",
  description:
    "Niwi Starter is a comprehensive, easy-to-use template for rapidly bootstrapping a Next.js application with essential features like authentication, blog management, email integration, database pre-seeding, and more. 🎉",
});

export default async function HomePage() {
  const session = await auth();

  const isAvailableBlogs = checkAvailableBlogs();
  let blogs: PublishedBlog[] = [];
  if (isAvailableBlogs) {
    blogs = await getLast3Blogs(session?.user?.id);
  }

  return (
    <main className={"h-screen overflow-x-hidden px-[20px] md:px-0"}>
      <HeroSection />

      <WorkHistory />

      {isAvailableBlogs ? (
        <section className="w-full max-w-[720px] mx-auto mt-[20px]">
          <div className="text-center">
            <CenterTitle>Latest Blogs</CenterTitle>
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
          {blogs.length === 0 && (
            <NiwiEmptyBlog
              title="There is no blogs"
              text="Let's create new blog ?"
            />
          )}
        </section>
      ) : (
        <section className="max-w-[720px] mx-auto mb-8">
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

      <section className="w-full mt-[60px] pt-[20px] max-w-[760px] mx-auto bg-white dark:bg-transparent rounded-[12px] ">
        <Faq />
      </section>

      <Footer />
    </main>
  );
}
