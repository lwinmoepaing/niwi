"use client";

import useBlogBookmark from "@/feats/blog/hooks/useBlogBookmark";
import useBlogFavorite from "@/feats/blog/hooks/useBlogFavorite";
import dateUtil from "@/libs/date/date-util";
import { cn } from "@/libs/utils";
import { PublishedBlog } from "@/types/blog-response";
import { CircleDashed } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import NiwiBlogCommentsModal from "../niwi-blog-comments/niwi-blog-comments-modal";
import NiwiBlogHeartIcon from "../niwi-blog-icons/niwi-blog-heart-icon";
import NiwiBlogMessageIcon from "../niwi-blog-icons/niwi-blog-message-icon";
import NiwiBookmarkIcon from "../niwi-blog-icons/niwi-bookmark-icon";
import NiwiBlogShareSetting from "../niwi-blog-share/niwi-blog-share-setting";
import NiwiBlogSettingMenu from "./niwi-blog-setting-menu";
import config from "@/config";

type NiwiBlogProfileProps = {
  blog: PublishedBlog;
  showSetting?: boolean;
  isFavorite: boolean;
  isBookmark: boolean;
  hideActions?: boolean;
  currentAuth?: User;
  commentCount: number;
  disabledLink?: boolean;
};

function NiwiBlogProfile({
  blog,
  showSetting,
  isFavorite: parentFav,
  isBookmark: parentIsBookmark,
  hideActions,
  currentAuth,
  commentCount,
  disabledLink,
}: NiwiBlogProfileProps) {
  // Favorites (HeartIcon)
  const { favCount, favorite, onClickFavorite } = useBlogFavorite({
    blogId: blog.id,
    isFavorite: parentFav,
    favoriteCount: blog.reactions?.heart || 0,
    currentAuthId: currentAuth?.id ?? "",
  });

  // Bookmark Blog
  const { isBookmark, onClickBookmark, bookmarkLoading } = useBlogBookmark({
    blogId: blog.id,
    isBookmark: parentIsBookmark,
    currentAuthId: currentAuth?.id ?? "",
  });

  // Comments
  const [isShowComment, setIsShowComment] = useState(false);
  const clickToShowCmt = useCallback(() => setIsShowComment(true), []);
  const hideToShowCmt = useCallback(() => setIsShowComment(false), []);

  const blogTitle = useMemo(() => {
    return !blog.title || blog.title === "-" ? "Untitled Blog" : blog.title;
  }, [blog?.title]);

  const link = useMemo(() => {
    const isOwner = currentAuth?.id === blog.userId;
    if (isOwner) return `/dashboard/blogs/${blog.id}`;
    return `/blogs/${blog.slug}`;
  }, []);

  return (
    <section
      className={cn(
        "niwi-blog-profile-container",
        blog.isPublished ? "blog-image-padding" : ""
      )}
    >
      <h1 className="niwi-blog-profile-header">
        {disabledLink ? (
          <span className="link">{blogTitle}</span>
        ) : (
          <Link href={link} className="link">
            {blogTitle}
          </Link>
        )}
      </h1>

      <div className="niwi-blog-profile-row">
        <Link href={`/profile/${blog.user?.shortLink || ""}`}>
          <div className="niwi-blog-profile-image">
            <Image
              width={44}
              height={44}
              src={blog.user?.image || "/images/auth/profile.png"}
              alt={blog.user?.name || "-"}
            />
          </div>
        </Link>
        <div className="niwi-blog-profile-right-section">
          <div className="niwi-blog-profile-name-container">
            <h3>{blog.user?.name || "-"}</h3>
          </div>
          <div className="niwi-blog-profile-datetime-container">
            <h4>
              {"estimate time to"} read ·{" "}
              {dateUtil(blog.createdAt).format("MMM D, YYYY")}
            </h4>
          </div>
        </div>
      </div>

      <div
        className={cn("niwi-blog-profile-actions", hideActions && " !hidden ")}
      >
        <div className="niwi-blog-profile-actions-container heart-container">
          <NiwiBlogHeartIcon isActive={favorite} onClick={onClickFavorite} />
          <span className="counter" onClick={onClickFavorite}>
            {favCount <= 0 ? "" : favCount}
          </span>
        </div>
        <div className="niwi-blog-profile-actions-container message-container">
          <NiwiBlogMessageIcon onClick={clickToShowCmt} />
          <span className="counter" onClick={clickToShowCmt}>
            {commentCount <= 0 ? "" : commentCount}
          </span>
        </div>
        <div className="niwi-blog-profile-actions-container standalone-icon">
          {bookmarkLoading ? (
            <CircleDashed className="animate-spin" size={12} />
          ) : (
            <NiwiBookmarkIcon onClick={onClickBookmark} active={isBookmark} />
          )}
        </div>
        <div className="niwi-blog-profile-actions-container standalone-icon">
          <NiwiBlogShareSetting
            link={`${config.domainUrl}/blogs/${blog.slug}`}
          />
        </div>
      </div>

      {!showSetting ? null : <NiwiBlogSettingMenu blogId={blog.id} />}

      {!isShowComment ? null : (
        <NiwiBlogCommentsModal
          blogId={blog.id}
          blogAuthorId={blog.user.id}
          show={isShowComment}
          onClose={hideToShowCmt}
          authUser={currentAuth}
        />
      )}

      {blog.isPublished && blog.previewImage ? (
        <div className="w-[35%] absolute right-0 top-0 h-[100%] py-[15px] pr-[15px]">
          <div className="relative w-full h-full rounded-[15px] overflow-hidden">
            <Image
              className="w-full h-full"
              src={blog.previewImage}
              alt={blogTitle}
              fill
              objectFit="cover"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
export default NiwiBlogProfile;
