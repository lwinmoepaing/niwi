import { checkResetPasswordKeyValid } from "@/feats/auth/services/auth.service";
import { getSeoTag } from "@/libs/seo/seo";
import Link from "next/link";
import ResetPasswordForm from "../assets/components/ResetPasswordForm";
import Button from "@/components/niwi-ui/button/button";

export const metadata = getSeoTag({
  title: "Reset Password",
  description: "Please don't give your information to someone.",
});

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
    <>
      <section className="w-full max-w-[400px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/auth/login">
          <Button variant={"niwi"}>Back to Login</Button>
        </Link>
      </section>
      <div className="px-[20px]">
        <section className="niwi-auth-section container">
          <ResetPasswordForm resetPasswordKey={resetPasswordKey} />
        </section>
      </div>
    </>
  );
}
export default ResetPasswordPage;
