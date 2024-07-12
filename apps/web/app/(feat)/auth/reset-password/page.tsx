import { checkResetPasswordKeyValid } from "@/feats/auth/services/auth.service";
import ResetPasswordForm from "../assets/components/ResetPasswordForm";

type ResetPasswordPageProps = {
  params: { slug: string };
  searchParams: { resetPasswordKey: string };
};

async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { resetPasswordKey } = searchParams;
  if (resetPasswordKey) {
    const { success, message } = await checkResetPasswordKeyValid(resetPasswordKey);
    if (!success) {
      return (
        <section className="mx-auto max-w-[360px] px-[20px] my-20">
          {message}
        </section>
      );
    }
  }

  return (
    <section className="mx-auto max-w-[360px] px-[20px] my-20">
      <ResetPasswordForm resetPasswordKey={resetPasswordKey} />
    </section>
  );
}
export default ResetPasswordPage;
