"use client";
import { magicLinkRequestAction } from "@/feats/auth/actions/auth.action";
import {
  MagicLinkFormValues,
  magicLinkSchema,
} from "@/feats/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useMagicLinkForm = () => {
  const [magicLinkResponse, dispatchReset, pending] = useActionState(
    magicLinkRequestAction,
    undefined
  );

  const form = useForm<MagicLinkFormValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: MagicLinkFormValues) => {
      dispatchReset(values);
    },
    [dispatchReset]
  );

  useEffect(() => {
    if (magicLinkResponse?.success === true) {
      toast.success(magicLinkResponse.message);
      form.reset({ email: "" }, { keepDefaultValues: false });
      return;
    }

    if (magicLinkResponse?.success === false) {
      toast.error(magicLinkResponse.message);
      return;
    }
  }, [magicLinkResponse]);

  return {
    magicLinkResponse,
    pending,
    handleSubmit,
    form,
  };
};

export default useMagicLinkForm;
