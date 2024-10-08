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
import FacebookIcon from "@/components/niwi-ui/social-icons/facebook-icon";
import GithubIcon from "@/components/niwi-ui/social-icons/github-icon";
import GoogleIcon from "@/components/niwi-ui/social-icons/google-icon";
import TwitterIcon from "@/components/niwi-ui/social-icons/twitter-icon";
import Link from "next/link";
import useLoginForm from "../hooks/useLoginForm";

function AuthLoginForm({
  availableAuths,
}: {
  availableAuths: {
    isAvailableMagicLinkAuth: boolean;
    isAvailableGoogleAuth: boolean;
    isAvailableGithubAuth: boolean;
    isAvailableFacebookAuth: boolean;
    isAvailableTwitterAuth: boolean;
  };
}) {
  const {
    pending,
    handleSubmit,
    form,
    errorMsgGoogle,
    dispatchGoogle,
    errorMsgGitHub,
    dispatchGitHub,
    errorMsgFacebook,
    dispatchFacebook,
    errorMsgTwitter,
    dispatchTwitter,
  } = useLoginForm();

  const {
    isAvailableMagicLinkAuth,
    isAvailableGoogleAuth,
    isAvailableGithubAuth,
    isAvailableFacebookAuth,
    isAvailableTwitterAuth,
  } = availableAuths;

  const allServiceNotAvailable =
    !isAvailableMagicLinkAuth &&
    !isAvailableGoogleAuth &&
    !isAvailableGithubAuth &&
    !isAvailableFacebookAuth &&
    !isAvailableTwitterAuth;

  return (
    <>
      <div className="text-center mb-2">
        <h1 className="text-3xl niwi-logo-text">Niwi Starter</h1>
      </div>
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

      {!allServiceNotAvailable && (
        <div className="my-2">
          <p className="text-center">
            <small>Or</small>
          </p>
        </div>
      )}

      {isAvailableMagicLinkAuth && (
        <div className="my-2">
          <Link href="/auth/magic-link" className="hover:underline niwi-link">
            <p className="text-center"> Magic Link 🚀 </p>
          </Link>
        </div>
      )}

      {isAvailableGoogleAuth && (
        <form className="flex flex-col my-[10px]" action={dispatchGoogle}>
          <SubmitButton
            text="Sign In with Google"
            variant={"outline"}
            rightIcon={<GoogleIcon className="w-5 h-5 ml-2" />}
          />
          {errorMsgGoogle ? <p>{errorMsgGoogle}</p> : null}
        </form>
      )}

      {isAvailableGithubAuth && (
        <form className="flex flex-col my-[10px]" action={dispatchGitHub}>
          <SubmitButton
            text="Sign In with Github"
            variant={"outline"}
            rightIcon={<GithubIcon className="w-5 h-5 ml-2" />}
          />
          {errorMsgGitHub ? <p>{errorMsgGitHub}</p> : null}
        </form>
      )}

      {isAvailableFacebookAuth && (
        <form className="flex flex-col my-[10px]" action={dispatchFacebook}>
          <SubmitButton
            text="Sign In with Facebook"
            variant={"outline"}
            rightIcon={<FacebookIcon className="w-5 h-5 ml-2" />}
          />
          {errorMsgFacebook ? <p>{errorMsgFacebook}</p> : null}
        </form>
      )}
      {isAvailableTwitterAuth && (
        <form className="flex flex-col my-[10px]" action={dispatchTwitter}>
          <SubmitButton
            text="Sign In with Twitter"
            variant={"outline"}
            rightIcon={<TwitterIcon className="w-4 h-4 ml-2" />}
          />
          {errorMsgTwitter ? <p>{errorMsgTwitter}</p> : null}
        </form>
      )}
      <div className="my-2 flex flex-row justify-between">
        <Link href="/auth/reset-password" className="hover:underline">
          <p>
            <small>Forgot your password ?</small>
          </p>
        </Link>
        <Link href="/auth/sign-up" className="hover:underline">
          <p>
            <small>Sign-up now</small>
          </p>
        </Link>
      </div>
    </>
  );
}
export default AuthLoginForm;
