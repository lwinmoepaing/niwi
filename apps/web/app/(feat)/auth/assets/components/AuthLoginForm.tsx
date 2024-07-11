"use client";
import SubmitButton from "@/components/niwi-ui/button/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/niwi-ui/form/form";
import { PasswordInput } from "@/components/niwi-ui/form/password-input";
import TextInput from "@/components/niwi-ui/form/text-input";
import useLoginForm from "../hooks/useLoginForm";

function AuthLoginForm() {
  const {
    pending,
    handleSubmit,
    form,
    dispatchGoogle,
    errorMsgGoogle,
    errorMsgGitHub,
    dispatchGitHub,
  } = useLoginForm();
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
      <form className="flex flex-col my-[20px]" action={dispatchGoogle}>
        <SubmitButton text="Sign In with Google " />
        {errorMsgGoogle ? <p>{errorMsgGoogle}</p> : null}
      </form>
      <form className="flex flex-col my-[20px]" action={dispatchGitHub}>
        <SubmitButton text="Sign In with Github" />
        {errorMsgGitHub ? <p>{errorMsgGitHub}</p> : null}
      </form>
    </>
  );
}
export default AuthLoginForm;
