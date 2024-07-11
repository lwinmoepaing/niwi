"use client";
import { resetPasswordAction } from "@/feats/auth/actions/auth.action";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useResetPasswordForm = () => {
  const [resetPasswordResponse, dispatchReset, pending] = useActionState(
    resetPasswordAction,
    undefined
  );

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: ForgotPasswordFormValues) => {
      dispatchReset(values);
    },
    [dispatchReset]
  );

  useEffect(() => {
    if (resetPasswordResponse?.success === true) {
      toast.success(resetPasswordResponse.message);
      return;
    }

    if (resetPasswordResponse?.success === false) {
      toast.error(resetPasswordResponse.message);
      return;
    }
  }, [resetPasswordResponse]);

  return {
    resetPasswordResponse,
    pending,
    handleSubmit,
    form,
  };
};

export default useResetPasswordForm;
