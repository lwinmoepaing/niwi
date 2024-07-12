"use client";
import SubmitButton from "@/components/niwi-ui/button/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/niwi-ui/form/form";
import TextInput from "@/components/niwi-ui/form/text-input";
import useForgotPasswordForm from "../hooks/useForgotPasswordForm";
import useResetPasswordForm from "../hooks/useResetPasswordForm";
import { PasswordInput } from "@/components/niwi-ui/form/password-input";

type ResetPasswordFormProps = {
  resetPasswordKey?: string;
};

function ResetPasswordForm({ resetPasswordKey }: ResetPasswordFormProps) {
  const { pending, handleSubmit, form } = useForgotPasswordForm();
  const {
    pending: resetPending,
    handleSubmit: resetHandleSubmit,
    form: resetForm,
  } = useResetPasswordForm({ resetPasswordKey });

  if (!resetPasswordKey)
    return (
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            action={() => form.handleSubmit(handleSubmit)()}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forgot password</FormLabel>
                  <FormControl>
                    <TextInput
                      type="email"
                      placeholder="johndoe@gmail.com"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton text="Send your email" />
          </form>
        </Form>
      </>
    );

  return (
    <Form {...resetForm}>
      <form
        className="flex flex-col gap-4"
        action={() => resetForm.handleSubmit(resetHandleSubmit)()}
      >
        <FormField
          control={resetForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  disabled={resetPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={resetForm.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmed password</FormLabel>
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Enter confirmed password"
                  disabled={resetPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text="Reset password" />
      </form>
    </Form>
  );
}
export default ResetPasswordForm;
