"use client";
import Button from "@/components/niwi-ui/button/button";
import { logOutAction } from "@/feats/auth/actions/auth.action";
import { CircleDashed } from "lucide-react";
import { useCallback, useTransition } from "react";

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = useCallback(async () => {
    startTransition(async () => await logOutAction());
  }, []);

  return (
    <Button disabled={isPending} onClick={handleSignOut}>
      {isPending ? (
        <>
          <CircleDashed className="animate-spin" />
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
};

export default SignOutButton;
