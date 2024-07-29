"use client";

import NiwiBlogProfile from "@/components/niwi-blog/niwi-blog-profile/niwi-blog-profile";
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
      blog={blog}
      currentAuth={currentAuth}
      isBookmark={(blog._count?.blogBookmarks || 0) > 0 || false}
      disabledLink={true}
      isFavorite={isFavorite}
      commentCount={currentBlog?._count?.blogComments || 0}
    />
  );
}
export default PublishBLogProfile;
