import Link from "next/link";
import ProfileEditor from "../assets/components/profile-editor-form";

type ProfileDetailPageProps = { params: { shortlink: string } };

const ProfileDetailPage = async ({
  params: { shortlink },
}: ProfileDetailPageProps) => {
  return (
    <div className="max-w-[860px] mx-auto w-full">
      <h2>
        <Link
          href="/dashboard/profile"
          className="hover:text-blue-500 transition-all"
        >
          Profile
        </Link>{" "}
        / {shortlink}
      </h2>

      <section>
        <ProfileEditor />
      </section>
    </div>
  );
};
export default ProfileDetailPage;
