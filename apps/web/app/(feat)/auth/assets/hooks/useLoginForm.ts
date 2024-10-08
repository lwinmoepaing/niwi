"use client";
import {
  facebookAuthAction,
  githubAuthAction,
  googleAuthAction,
  loginAction,
  twitterAuthAction,
} from "@/feats/auth/actions/auth.action";
import {
  loginFormSchema,
  LoginFormValues,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useLoginForm = () => {
  const router = useRouter();

  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthAction,
    undefined
  );

  const [errorMsgGitHub, dispatchGitHub] = useActionState(
    githubAuthAction,
    undefined
  );

  const [errorMsgFacebook, dispatchFacebook] = useActionState(
    facebookAuthAction,
    undefined
  );

  const [errorMsgTwitter, dispatchTwitter] = useActionState(
    twitterAuthAction,
    undefined
  );

  const [logInError, dispatchLogIn, pending] = useActionState(
    loginAction,
    undefined
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      dispatchLogIn(values);
    },
    [dispatchLogIn]
  );

  useEffect(() => {
    if (logInError?.message === "Redirect") {
      router.push("/");
      return;
    }
    if (logInError?.message) {
      toast.error(logInError.message);
    }
  }, [logInError]);

  return {
    pending,
    handleSubmit,
    form,
    errorMsgGoogle,
    dispatchGoogle,
    errorMsgGitHub,
    dispatchGitHub,
    errorMsgFacebook,
    dispatchFacebook,
    errorMsgTwitter,
    dispatchTwitter,
  };
};

export default useLoginForm;
