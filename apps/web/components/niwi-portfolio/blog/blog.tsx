import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
import NiwiEmptyBlog from "@/components/niwi-blog/niwi-blog-profile/niwi-empty-blog";
import CenterTitle from "@/components/niwi-ui/center-title/center-title";
import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import { PublishedBlog } from "@/types/blog-response";
import { User } from "next-auth";

function Blog({
  isAvailableBlogs,
  blogs,
  currentAuth,
}: {
  isAvailableBlogs: boolean;
  blogs: PublishedBlog[];
  currentAuth?: User;
}) {
  return (
    <>
      {isAvailableBlogs ? (
        <section className="w-full max-w-[720px] mx-auto mt-[20px]">
          <div className="text-center">
            <CenterTitle>Latest Blogs</CenterTitle>
          </div>
          {blogs.map((item) => (
            <NiwiBlogProfile
              key={item.id}
              blog={item}
              currentAuth={currentAuth}
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
    </>
  );
}
export default Blog;
