import Button from "@/components/niwi-ui/button/button";
import { checkAvailabeOtherAuths } from "@/feats/auth/services/auth.service";
import { getSeoTag } from "@/libs/seo/seo";
import Link from "next/link";
import AuthLoginForm from "../assets/components/AuthLoginForm";

export const metadata = getSeoTag({
  title: "Login",
  description: "Please login to your account !",
});

async function AuthLoginPage() {
  const availableAuths = checkAvailabeOtherAuths();
  return (
    <>
      <section className="w-full max-w-[400px] mx-auto px-[20px] mt-[40px] mb-[20px]">
        <Link href="/">
          <Button variant={"niwi"}>Go Back Home</Button>
        </Link>
      </section>
      <div className="px-[20px]">
        <section className="niwi-auth-section container">
          <AuthLoginForm availableAuths={availableAuths} />
        </section>
      </div>
    </>
  );
}
export default AuthLoginPage;
