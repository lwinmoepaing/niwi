"use client";

import { magicLinkSignInAction } from "@/feats/auth/actions/auth.action";
import { CircleDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

function MagicLinkRedirect({ magicKey }: { magicKey: string }) {
  const router = useRouter();
  const [magicLinkResponse, dispatchMagicSignIn] = useActionState(
    magicLinkSignInAction,
    undefined
  );

  useEffect(() => {
    dispatchMagicSignIn(magicKey);
  }, []);

  useEffect(() => {
    if (magicLinkResponse?.message === "Redirect") {
      router.push("/");
      return;
    }

    if (magicLinkResponse?.success === true) {
      toast.success(magicLinkResponse.message);
      router.push("/");
      return;
    }

    if (magicLinkResponse?.success === false) {
      toast.error(magicLinkResponse.message);
      router.push("/");
      return;
    }
  }, [magicLinkResponse]);

  return (
    <div className="flex flex-row">
      <CircleDashed className="animate-spin mr-2" /> Login with Magic...{" "}
    </div>
  );
}
export default MagicLinkRedirect;
