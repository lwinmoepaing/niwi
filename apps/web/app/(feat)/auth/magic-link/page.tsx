import { checkMagicKeyValid } from "@/feats/auth/services/auth.service";
import MagicLinkForm from "../assets/components/MagicLinkForm";
import Link from "next/link";
import { cn } from "@/libs/utils";
import MagicLinkRedirect from "../assets/components/MagicLinkRedirect";

type MagicLinkPageProps = {
  params: { slug: string };
  searchParams: { magicKey: string };
};

const sectionStyle = "mx-auto max-w-[360px] px-[20px] my-20";

async function MagicLinkPage({ searchParams }: MagicLinkPageProps) {
  const { magicKey } = searchParams;
  if (!magicKey) {
    return (
      <section className={sectionStyle}>
        <MagicLinkForm />
      </section>
    );
  }

  const { success, message } = await checkMagicKeyValid(magicKey);
  if (!success) {
    return (
      <section className={cn(sectionStyle, "text-center")}>
        <p>{message}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go Home
        </Link>
      </section>
    );
  }

  return (
    <section className={sectionStyle}>
      <MagicLinkRedirect magicKey={magicKey} />
    </section>
  );
}
export default MagicLinkPage;
