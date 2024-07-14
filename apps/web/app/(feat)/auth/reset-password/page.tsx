import { checkResetPasswordKeyValid } from "@/feats/auth/services/auth.service";
import ResetPasswordForm from "../assets/components/ResetPasswordForm";
import Link from "next/link";

type ResetPasswordPageProps = {
  params: { slug: string };
  searchParams: { resetPasswordKey: string };
};

async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { resetPasswordKey } = searchParams;
  if (resetPasswordKey) {
    const { success, message } =
      await checkResetPasswordKeyValid(resetPasswordKey);
    if (!success) {
      return (
        <section className="niwi-auth-section container">{message}</section>
      );
    }
  }

  return (
    <section className="niwi-auth-section container">
      <ResetPasswordForm resetPasswordKey={resetPasswordKey} />
      <Link href="/auth/login" className="niwi-link hover:underline mt-2 block">
        Go Back
      </Link>
    </section>
  );
}
export default ResetPasswordPage;
