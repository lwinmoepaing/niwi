import { checkMagicKeyValid } from "@/feats/auth/services/auth.service";
import { getSeoTag } from "@/libs/seo/seo";
import { cn } from "@/libs/utils";
import Link from "next/link";
import MagicLinkForm from "../assets/components/MagicLinkForm";
import MagicLinkRedirect from "../assets/components/MagicLinkRedirect";
import Button from "@/components/niwi-ui/button/button";

export const metadata = getSeoTag({
  title: "Magic Link",
  description: "This is some kind of Magic <3.",
});

type MagicLinkPageProps = {
  params: { slug: string };
  searchParams: { magicKey: string };
};

const sectionStyle = "niwi-auth-section container";

async function MagicLinkPage({ searchParams }: MagicLinkPageProps) {
  const { magicKey } = searchParams;
  if (!magicKey) {
    return (
      <>
        <section className="w-full max-w-[400px] mx-auto px-[20px] mt-[40px] mb-[20px]">
          <Link href="/auth/login">
            <Button variant={"niwi"}>Back to Login</Button>
          </Link>
        </section>
        <div className="px-[20px]">
          <section className={sectionStyle}>
            <MagicLinkForm />
          </section>
        </div>
      </>
    );
  }

  const { success, message } = await checkMagicKeyValid(magicKey);
  if (!success) {
    return (
      <>
        <section className="w-full max-w-[400px] mx-auto px-[20px] mt-[40px] mb-[20px]">
          <Link href="/">
            <Button variant={"niwi"}>Go Back Home</Button>
          </Link>
        </section>
        <div className="px-[20px]">
          <section className={cn(sectionStyle, "text-center")}>
            <p>{message}</p>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="w-full mt-[40px] mb-[20px]"></section>
      <section className={sectionStyle}>
        <MagicLinkRedirect magicKey={magicKey} />
      </section>
    </>
  );
}
export default MagicLinkPage;
