"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/niwi-ui/form/form";
import TextInput from "@/components/niwi-ui/form/text-input";
import useLoginForm from "../hooks/useLoginForm";
import { PasswordInput } from "@/components/niwi-ui/form/password-input";
import SubmitButton from "@/components/niwi-ui/button/submit-button";

function AuthLoginForm() {
  const { pending, handleSubmit, form } = useLoginForm();
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <TextInput
                    type="email"
                    placeholder="johndoe@gmail.com"
                    disabled={pending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  <small>
                    This is the email address you signed up to Niwi.
                  </small>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Password"
                    disabled={pending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton text="Login" />
        </form>
      </Form>
    </>
  );
}
export default AuthLoginForm;
