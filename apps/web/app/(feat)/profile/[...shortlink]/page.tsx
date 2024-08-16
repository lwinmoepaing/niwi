import NiwiProfileCard from "@/components/niwi-profile/niwi-profile-card/niwi-profile-card";
import { gerUserByShortLink } from "@/feats/profile/services/profile.service";
import { auth } from "@/libs/auth/next-auth";
import { getSeoTag } from "@/libs/seo/seo";
import { notFound } from "next/navigation";

type ProfileDetailPageProps = {
  params: {
    shortlink: string[];
  };
};

export async function generateMetadata({
  params: { shortlink },
}: ProfileDetailPageProps) {
  const { success, data } = await gerUserByShortLink(shortlink?.[0] || "");
  if (!success || !data) {
    return getSeoTag({
      title: "Not found Profile",
      description: "Profile is not found | 404 🎉",
    });
  }

  return getSeoTag({
    title: data.name,
    description: data.profile.statusMessage ?? `This is ${data.name} | Profile`,
    image: data.image,
  });
}

const ProfileDetailPage = async ({
  params: { shortlink },
}: ProfileDetailPageProps) => {
  const session = await auth();
  const { success, data } = await gerUserByShortLink(shortlink?.[0] || "");
  if (!success || !data) return notFound();

  return (
    <div className="max-w-[960px] px-[20px] lg:px-0 mx-auto w-full mt-28">
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
