"use client";

import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
import dateUtil from "@/libs/date/date-util";
import useBlogStore from "@/stores/blog/blog.store";
import { PublishedBlog } from "@/types/blog-response";
import { User } from "next-auth";
import { useEffect, useMemo } from "react";

function PublishBLogProfile({
  blog,
  currentAuth,
}: {
  blog: PublishedBlog;
  currentAuth?: User;
}) {
  const [currentBlog, setCurrentBlog] = useBlogStore((store) => [
    store.currentBlog,
    store.setCurrentBlog,
  ]);

  const isFavorite = useMemo(() => {
    if (!blog?.userBlogReaction) return false;
    return blog.userBlogReaction.some((item) => item.reaction === "HEART");
  }, [blog]);

  useEffect(() => {
    setCurrentBlog(blog);
  }, [blog]);

  return (
    <NiwiBlogProfile
      title={blog.title || "--"}
      profileLink={`/profile/${blog.user?.id || ""}`}
      profileImg={blog.user?.image || "/images/auth/profile.png"}
      profileName={blog.user?.name || "-"}
      estimateTime={"estimate time to "}
      date={dateUtil(blog.createdAt).format("MMM D, YYYY")}
      blogId={blog.id}
      favoriteCount={blog.reactions?.heart || 0}
      isFavorite={isFavorite}
      isBookmark={(blog._count?.blogBookmarks || 0) > 0 || false}
      currentAuth={currentAuth}
      hideActions={!blog.isPublished}
      blogAuthorId={blog.user.id}
      commentCount={currentBlog?._count?.blogComments || 0}
      disabledLink={true}
    />
  );
}
export default PublishBLogProfile;
