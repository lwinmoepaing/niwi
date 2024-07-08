"use client";
import {
  googleAuthAction,
  loginAction,
} from "@/feats/auth/actions/auth.action";
import {
  loginFormSchema,
  LoginFormValues,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useLoginForm = () => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthAction,
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
  };
};

export default useLoginForm;
