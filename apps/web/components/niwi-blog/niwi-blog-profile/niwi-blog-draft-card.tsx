import Image from "next/image";
import Link from "next/link";
import NiwiBlogSettingMenu from "./niwi-blog-setting-menu";

type NiwiBlogDraftCardProps = {
  title: string;
  profileImg: string;
  profileName: string;
  profileLink: string;
  estimateTime: string;
  currentAuthId?: string;
  date: string;
};

function NiwiBlogDraftCard({
  title,
  profileImg,
  profileName,
  profileLink,
  estimateTime,
  date,
}: NiwiBlogDraftCardProps) {
  return (
    <section className="niwi-blog-profile-container">
      <h1 className="niwi-blog-profile-header">
        {!title || title === "-" ? "Untitled Blog" : title}
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
      <NiwiBlogSettingMenu />
    </section>
  );
}
export default NiwiBlogDraftCard;
