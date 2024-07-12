"use client";
import { forgotPasswordAction } from "@/feats/auth/actions/auth.action";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useForgotPasswordForm = () => {
  const [forgotPasswordResponse, dispatchReset, pending] = useActionState(
    forgotPasswordAction,
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
    if (forgotPasswordResponse?.success === true) {
      toast.success(forgotPasswordResponse.message);
      form.reset({ email: "" }, { keepDefaultValues: false });
      return;
    }

    if (forgotPasswordResponse?.success === false) {
      toast.error(forgotPasswordResponse.message);
      return;
    }
  }, [forgotPasswordResponse]);

  return {
    forgotPasswordResponse,
    pending,
    handleSubmit,
    form,
  };
};

export default useForgotPasswordForm;
