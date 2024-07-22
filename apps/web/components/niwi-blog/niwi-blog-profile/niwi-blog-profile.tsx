import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import NiwiBlogHeartIcon from "../niwi-blog-icons/niwi-blog-heart-icon";
import NiwiBlogMessageIcon from "../niwi-blog-icons/niwi-blog-message-icon";
import NiwiBlogShareIcon from "../niwi-blog-icons/niwi-blog-share-icon";
import NiwiBookmarkIcon from "../niwi-blog-icons/niwi-bookmark-icon";

type NiwiBlogProfileProps = {
  title: string;
  profileImg: string;
  profileName: string;
  profileLink: string;
  estimateTime: string;
  date: string;
};

function NiwiBlogProfile({
  title,
  profileImg,
  profileName,
  profileLink,
  estimateTime,
  date,
}: NiwiBlogProfileProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [count, setCount] = useState(10);
  const [messageCount] = useState(12);

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
    setCount((prev) => (prev === 10 ? prev + 1 : prev - 1));
  }, []);

  const toggleBookmark = useCallback(() => {
    setIsBookmark((prev) => !prev);
  }, []);

  return (
    <section className="niwi-blog-profile-container">
      <h1 className="niwi-blog-profile-header">{title}</h1>
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
      <div className="niwi-blog-profile-actions">
        <div className="niwi-blog-profile-actions-container heart-container">
          <NiwiBlogHeartIcon isActive={isFavorite} onClick={toggleFavorite} />
          <span className="counter" onClick={toggleFavorite}>
            {count}
          </span>
        </div>
        <div className="niwi-blog-profile-actions-container message-container">
          <NiwiBlogMessageIcon onClick={() => {}} />
          <span className="counter" onClick={() => {}}>
            {messageCount}
          </span>
        </div>
        <div className="niwi-blog-profile-actions-container small">
          <NiwiBookmarkIcon onClick={toggleBookmark} active={isBookmark} />
        </div>
        <div className="niwi-blog-profile-actions-container small">
          <NiwiBlogShareIcon onClick={() => {}} />
        </div>
      </div>
    </section>
  );
}
export default NiwiBlogProfile;
