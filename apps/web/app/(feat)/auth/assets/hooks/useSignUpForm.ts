"use client";
import { signUpAction } from "@/feats/auth/actions/auth.action";
import {
  signUpFormSchema,
  SignUpFormValues,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useSignUpForm = () => {
  const [signUpResponse, dispatchSignup, pending] = useActionState(
    signUpAction,
    undefined
  );

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: SignUpFormValues) => {
      dispatchSignup(values);
    },
    [dispatchSignup]
  );

  useEffect(() => {
    if (signUpResponse?.success === true) {
      toast.success(signUpResponse.message);
      return;
    }

    if (signUpResponse?.success === false) {
      toast.error(signUpResponse.message);
      return;
    }
  }, [signUpResponse]);

  return {
    signUpResponse,
    pending,
    handleSubmit,
    form,
  };
};

export default useSignUpForm;
