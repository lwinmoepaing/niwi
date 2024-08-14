"use client";
import Button from "@/components/niwi-ui/button/button";
import { logOutAction } from "@/feats/auth/actions/auth.action";
import { CircleDashed, LogOut } from "lucide-react";
import { useCallback, useTransition } from "react";

type SignOutButtonProps = {
  text?: string;
  className?: string;
  withMobileIcon?: boolean;
};

const SignOutButton = ({
  text = "Sign Out",
  className,
  withMobileIcon,
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
      ) : withMobileIcon ? (
        <>
          <LogOut size={14} className="md:hidden"/>
          <span className="hidden md:inline-block">{text}</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SignOutButton;
