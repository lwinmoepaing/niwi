import { cancelSubscriptionAction } from "@/feats/payment/actions/payment.action";
import {
  cancelSubscriptionSchema,
  CancelSubscriptionValues,
} from "@/feats/payment/validations/payment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useCancelSubscription = ({
  subscriptionId,
  userId,
}: CancelSubscriptionValues) => {
  const [cancelSubResponse, dispatchCancelSub, pending] = useActionState(
    cancelSubscriptionAction,
    undefined
  );

  const { handleSubmit, reset } = useForm<CancelSubscriptionValues>({
    resolver: zodResolver(cancelSubscriptionSchema),
    defaultValues: { subscriptionId, userId },
  });

  const submit = useCallback(
    async (values: CancelSubscriptionValues) => {
      console.log("Dispatch");
      dispatchCancelSub(values);
    },
    [dispatchCancelSub]
  );

  const resetForm = useCallback(() => {
    reset({ subscriptionId, userId }, { keepDefaultValues: false });
  }, []);

  useEffect(() => {
    if (cancelSubResponse?.success === true) {
      toast.success(cancelSubResponse.message);
      return;
    }

    if (cancelSubResponse?.success === false) {
      toast.error(cancelSubResponse.message);
      return;
    }
  }, [cancelSubResponse]);

  return {
    handleSubmit: handleSubmit(submit),
    pending,
    cancelSubResponse,
    resetForm,
  };
};

export default useCancelSubscription;
