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
import useSignUpForm from "../hooks/useSignUpForm";

function AuthSignUpForm() {
  const { pending, handleSubmit, form, signUpResponse } = useSignUpForm();
  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          action={() => form.handleSubmit(handleSubmit)()}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <TextInput
                    type="text"
                    placeholder="Enter your name..."
                    disabled={pending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmed password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Enter confirmed password"
                    disabled={pending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton text="Sign Up" />
        </form>
      </Form>
    </>
  );
}
export default AuthSignUpForm;
