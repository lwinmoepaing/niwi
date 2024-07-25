import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import NiwiBlogHeartIcon from "../niwi-blog-icons/niwi-blog-heart-icon";
import NiwiBlogMessageIcon from "../niwi-blog-icons/niwi-blog-message-icon";
import NiwiBlogShareIcon from "../niwi-blog-icons/niwi-blog-share-icon";
import NiwiBookmarkIcon from "../niwi-blog-icons/niwi-bookmark-icon";
import NiwiBlogSettingMenu from "./niwi-blog-setting-menu";
import useBlogFavorite from "@/feats/blog/hooks/useBlogFavorite";
import { cn } from "@/libs/utils";
import NiwiBlogCommentsModal from "../niwi-blog-comments/niwi-blog-comments-modal";

type NiwiBlogProfileProps = {
  title: string;
  profileImg: string;
  profileName: string;
  profileLink: string;
  estimateTime: string;
  currentAuthId?: string;
  date: string;
  blogId: string;
  showSetting?: boolean;
  favoriteCount: number;
  isFavorite: boolean;
  hideActions?: boolean;
};

function NiwiBlogProfile({
  title,
  profileImg,
  profileName,
  profileLink,
  estimateTime,
  date,
  blogId,
  showSetting,
  favoriteCount,
  isFavorite: parentFav,
  hideActions,
  currentAuthId,
}: NiwiBlogProfileProps) {
  // Favorites (HeartIcon)
  const { favCount, favorite, onClickFavorite } = useBlogFavorite({
    blogId,
    isFavorite: parentFav,
    favoriteCount,
    currentAuthId: currentAuthId ?? "",
  });

  // Comments
  const [isShowComment, setIsShowComment] = useState(false);
  const clickToShowCmt = useCallback(() => setIsShowComment(true), []);
  const hideToShowCmt = useCallback(() => setIsShowComment(false), []);

  // Bookmarks
  const [isBookmark, setIsBookmark] = useState(false);
  const [messageCount] = useState(0);
  const toggleBookmark = useCallback(() => {
    setIsBookmark((prev) => !prev);
  }, []);

  return (
    <section className="niwi-blog-profile-container">
      <h1 className="niwi-blog-profile-header">
        <Link href={`/dashboard/blogs/${blogId}`} className="link">
          {!title || title === "-" ? "Untitled Blog" : title}
        </Link>
      </h1>
      <div className="niwi-blog-profile-row">
        <Link href={profileLink}>
          <div className="niwi-blog-profile-image">
            <Image width={44} height={44} src={profileImg} alt={profileName} />
          </div>
        </Link>
        <div className="niwi-blog-profile-right-section">
          <div className="niwi-blog-profile-name-container">
            <h3>{profileName}</h3>
          </div>
          <div className="niwi-blog-profile-datetime-container">
            <h4>
              {estimateTime} read · {date}
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
          <span className="counter" onClick={() => {}}>
            {messageCount <= 0 ? "" : messageCount}
          </span>
        </div>
        <div className="niwi-blog-profile-actions-container">
          <NiwiBookmarkIcon onClick={toggleBookmark} active={isBookmark} />
        </div>
        <div className="niwi-blog-profile-actions-container">
          <NiwiBlogShareIcon onClick={() => {}} />
        </div>
      </div>
      {!showSetting ? null : <NiwiBlogSettingMenu blogId={blogId} />}

      {!isShowComment ? null : (
        <NiwiBlogCommentsModal
          show={isShowComment}
          blogId={blogId}
          onClose={hideToShowCmt}
        />
      )}
    </section>
  );
}
export default NiwiBlogProfile;
