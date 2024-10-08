"use client";
import { resetPasswordAction } from "@/feats/auth/actions/auth.action";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useResetPasswordForm = ({
  resetPasswordKey,
}: {
  resetPasswordKey?: string;
}) => {
  const router = useRouter();

  const [forgotPasswordResponse, dispatchReset, pending] = useActionState(
    resetPasswordAction,
    undefined
  );

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetPasswordKey: resetPasswordKey,
    },
  });

  const handleSubmit = useCallback(
    async (values: ResetPasswordFormValues) => {
      dispatchReset(values);
    },
    [dispatchReset]
  );

  useEffect(() => {
    if (forgotPasswordResponse?.success === true) {
      toast.success(forgotPasswordResponse.message);
      form.reset(
        { resetPasswordKey, password: "", passwordConfirm: "" },
        { keepDefaultValues: false }
      );
      router.push("/auth/login");
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

export default useResetPasswordForm;
