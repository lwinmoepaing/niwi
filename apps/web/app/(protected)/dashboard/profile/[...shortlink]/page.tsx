import NiwiProfileCard from "@/components/niwi-profile/niwi-profile-card/niwi-profile-card";
import { gerUserByShortLink } from "@/feats/profile/services/profile.service";
import { auth } from "@/libs/auth/next-auth";
import { notFound } from "next/navigation";
import ShortLinkUpdater from "../components/short-link-updater";

type ProfileDetailPageProps = {
  params: {
    shortlink: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const ProfileDetailPage = async ({
  params: { shortlink },
  searchParams,
}: ProfileDetailPageProps) => {
  const session = await auth();
  const { success, data } = await gerUserByShortLink(shortlink?.[0] || "");
  if (!success || !data) return notFound();

  const shortLinkParm = searchParams?.shortLink;
  const shortLink =
    shortLinkParm && typeof shortLinkParm === "string" ? shortLinkParm : "";
  const isNeedToUpdate =
    shortLink &&
    session?.user?.shortLink !== shortLink &&
    data.shortLink === shortLink;

  return (
    <div className="max-w-[880px] mx-auto w-full">
      <section>
        {isNeedToUpdate && <ShortLinkUpdater shortLink={shortLink} />}
        <NiwiProfileCard
          user={data}
          isEditor={true}
          authUser={session?.user}
          showHeader={true}
        />
      </section>
    </div>
  );
};
export default ProfileDetailPage;
