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
import useResetPasswordForm from "../hooks/useResetPasswordForm";

function ResetPasswordForm() {
  const { pending, handleSubmit, form } = useResetPasswordForm();
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
                <FormLabel>Reset Email</FormLabel>
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
          <SubmitButton text="Reset now" />
        </form>
      </Form>
    </>
  );
}
export default ResetPasswordForm;
