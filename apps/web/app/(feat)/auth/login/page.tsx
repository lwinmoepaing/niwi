import { checkAvailabeOtherAuths } from "@/feats/auth/services/auth.service";
import AuthLoginForm from "../assets/components/AuthLoginForm";

async function AuthLoginPage() {
  const availableAuths = checkAvailabeOtherAuths();
  return (
    <section className="niwi-auth-section container">
      <AuthLoginForm availableAuths={availableAuths} />
    </section>
  );
}
export default AuthLoginPage;
