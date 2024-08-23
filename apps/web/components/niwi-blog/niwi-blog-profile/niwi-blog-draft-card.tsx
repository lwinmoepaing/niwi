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
  blogId: string;
  showSetting?: boolean;
};

function NiwiBlogDraftCard({
  title,
  profileImg,
  profileName,
  profileLink,
  estimateTime,
  date,
  blogId,
  showSetting,
}: NiwiBlogDraftCardProps) {
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
            <Image fill src={profileImg} alt={profileName} className="object-cover" />
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
      {!showSetting ? null : <NiwiBlogSettingMenu blogId={blogId} />}
    </section>
  );
}
export default NiwiBlogDraftCard;
