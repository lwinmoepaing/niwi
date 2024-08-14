import NiwiProfileCard from "@/components/niwi-profile/niwi-profile-card/niwi-profile-card";
import { gerUserByShortLink } from "@/feats/profile/services/profile.service";
import { auth } from "@/libs/auth/next-auth";
import { notFound } from "next/navigation";

type ProfileDetailPageProps = {
  params: {
    shortlink: string[];
  };
};

const ProfileDetailPage = async ({
  params: { shortlink },
}: ProfileDetailPageProps) => {
  const session = await auth();
  const { success, data } = await gerUserByShortLink(shortlink?.[0] || "");
  if (!success || !data) return notFound();

  return (
    <div className="max-w-[860px] mx-auto w-full mt-28">
      <section>
        <NiwiProfileCard
          user={data}
          isEditor={false}
          authUser={session?.user}
          showHeader={false}
        />
      </section>
    </div>
  );
};
export default ProfileDetailPage;
