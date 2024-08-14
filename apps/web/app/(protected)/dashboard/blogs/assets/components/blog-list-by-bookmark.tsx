"use client";

import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
import { NiwiBlogProfileSkeleton } from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-skeletons";
import NiwiEmptyBlog from "@/components/niwi-blog/niwi-blog-profile/niwi-empty-blog";
import { useGetBookmarkedBlogs } from "@/feats/blog/api/get-bookmarked-blogs";
import { BookmarkBlog } from "@/types/blog-response";
import { Bookmark } from "lucide-react";
import { User } from "next-auth";
import { memo, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

function BlogListByBookmark({ currentAuth }: { currentAuth?: User }) {
  const { ref, inView } = useInView({ threshold: 0 });

  const { data, isFetching, fetchNextPage, hasNextPage } =
    useGetBookmarkedBlogs({
      pageNo: 1,
      userId: currentAuth?.id,
    });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  const blogList = useMemo<BookmarkBlog[]>(() => {
    if (!data?.pages) return [];

    const items = data.pages.reduce((prev, next) => {
      return [...prev, ...next.data];
    }, [] as BookmarkBlog[]);

    return items;
  }, [data]);

  if (!isFetching && blogList.length <= 0) {
    return (
      <>
        <NiwiEmptyBlog title={"You haven’t any bookmark yet."} />
      </>
    );
  }

  return (
    <section className="overflow-auto relative">
      {blogList.map((item) => (
        <div className="relative" key={item.id}>
          <NiwiBlogProfile
            blog={item.blog}
            currentAuth={currentAuth}
            showSetting={false}
            isBookmark={(item.blog._count?.blogBookmarks || 0) > 0 || false}
            isFavorite={item.blog.userBlogReaction.some(
              (item) => item.reaction === "HEART"
            )}
            commentCount={item.blog._count?.blogComments || 0}
          />
          <Bookmark
            size={30}
            className={" fill absolute top-[13px] right-[13px]"}
          />
        </div>
      ))}
      {isFetching ? (
        <>
          <NiwiBlogProfileSkeleton />
          <NiwiBlogProfileSkeleton />
        </>
      ) : (
        <div ref={ref} className="h-[20px]"></div>
      )}
    </section>
  );
}
export default memo(BlogListByBookmark);
