"use client";
import Button from "@/components/niwi-ui/button/button";
import { logOutAction } from "@/feats/auth/actions/auth.action";
import { CircleDashed } from "lucide-react";
import { useCallback, useTransition } from "react";

type SignOutButtonProps = {
  text?: string;
  className?: string;
};

const SignOutButton = ({
  text = "Sign Out",
  className,
}: SignOutButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = useCallback(async () => {
    startTransition(async () => {
      try {
        return await logOutAction();
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return (
    <Button disabled={isPending} onClick={handleSignOut} className={className}>
      {isPending ? (
        <>
          <CircleDashed className="animate-spin" />
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SignOutButton;
