import Button from "@/components/niwi-ui/button/button";
import { getSeoTag } from "@/libs/seo/seo";
import AuthSignUpForm from "../assets/components/AuthSignUpForm";
import Link from "next/link";

export const metadata = getSeoTag({
  title: "Register Account",
  description: "Please register your information.",
});

function SignUpPage() {
  return (
    <>
      <section className="w-full max-w-[400px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/auth/login">
          <Button variant={"niwi"}>Back to Login</Button>
        </Link>
      </section>
      <div className="px-[20px]">
        <section className="niwi-auth-section container">
          <AuthSignUpForm />
        </section>
      </div>
    </>
  );
}
export default SignUpPage;
