"use client";

import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";

import NiwiBlogDraftCard from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-draft-card";
import {
  NiwiBlogProfileSkeleton,
  NiwiDraftBlogProfileSkeleton,
} from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-skeletons";
import { useGetBlogsByAuthor } from "@/feats/blog/api/get-blogs-by-author";
import { Blog } from "@/types/blog-response";
import { memo, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import NiwiEmptyBlog from "@/components/niwi-blog/niwi-blog-profile/niwi-empty-blog";

function BlogListByAuthor({
  authorId,
  publishStatus,
}: {
  authorId: string;
  publishStatus: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0 });

  const { data, isFetching, fetchNextPage, hasNextPage } = useGetBlogsByAuthor({
    pageNo: 1,
    authorId,
    publishStatus,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  const blogList = useMemo<Blog[]>(() => {
    if (!data?.pages) return [];

    const items = data.pages.reduce((prev, next) => {
      return [...prev, ...next.data];
    }, [] as Blog[]);

    return items;
  }, [data?.pages]);

  if (!isFetching && blogList.length <= 0) {
    return (
      <>
        <NiwiEmptyBlog
          title={
            publishStatus
              ? "You haven’t published any blogs yet."
              : undefined
          }
        />
      </>
    );
  }

  if (publishStatus) {
    return (
      <section className="overflow-auto relative">
        {blogList.map((item) => (
          <NiwiBlogProfile
            key={item.id}
            title={item.title}
            profileLink={`/dashboard/profile/${item.user.id}`}
            profileImg={item.user.image}
            profileName={item.user.name}
            estimateTime={"5 minutes to "}
            date={"Jun 21, 2024"}
            currentAuthId={authorId}
            blogId={item.id}
            showSetting={true}
          />
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

  return (
    <section className="overflow-auto relative">
      {blogList.map((item) => (
        <NiwiBlogDraftCard
          key={item.id}
          title={item.title}
          profileLink={`/dashboard/profile/${item.user.id}`}
          profileImg={item.user.image}
          profileName={item.user.name}
          estimateTime={"5 minutes to "}
          date={"Jun 21, 2024"}
          currentAuthId={authorId}
          blogId={item.id}
          showSetting={true}
        />
      ))}
      {isFetching ? (
        <>
          <NiwiDraftBlogProfileSkeleton />
          <NiwiDraftBlogProfileSkeleton />
        </>
      ) : (
        <div ref={ref} className="h-[20px]"></div>
      )}
    </section>
  );
}
export default memo(BlogListByAuthor);
