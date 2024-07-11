"use server";

import { signIn, signOut } from "@/libs/auth/next-auth";
import { AuthError } from "next-auth";
import { render } from "@react-email/render";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
  LoginFormValues,
  signUpFormSchema,
  SignUpFormValues,
} from "../validations/auth.validation";
import {
  createUser,
  getUserByEmail,
  updateUser,
} from "../services/auth.service";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { hashPassword } from "@/libs/hash/hash";
import config from "@/config";
import { sendEmail } from "@/libs/mail/mailgun";
import ResetPasswordEmail from "@/feats/mail/template/reset-password-mail";
import { nanoid } from "nanoid";

export async function loginAction(
  _currentState: unknown,
  authData: LoginFormValues
) {
  try {
    await signIn("credentials", authData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return { message: error.cause?.err.message };
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Could not sign in." };
      }
    }
    throw error;
  }
}

export async function signUpAction(
  _currentState: unknown,
  data: SignUpFormValues
) {
  try {
    const { error } = signUpFormSchema.safeParse(data);
    if (error) {
      return responseError("", error.format());
    }

    const { name, email, password } = data;
    const user = await getUserByEmail(email);
    if (user) {
      return responseError("User already exists");
    }
    const { hash, salt } = hashPassword(password);
    const newUserData = {
      name,
      email,
      password: hash,
      salt,
      role: "USER",
      image: config.defaultUserImage,
    } as const;
    const newUser = await createUser({ ...newUserData });
    return responseSuccess("Successfully created User", newUser);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
}

export async function resetPasswordAction(
  _currentState: unknown,
  data: ForgotPasswordFormValues
) {
  const { error } = forgotPasswordSchema.safeParse(data);
  if (error) {
    return responseError("", error.format());
  }

  const { email } = data;
  const user = await getUserByEmail(email);
  if (!user) {
    return responseError("Your email address is not found");
  }

  const id = nanoid();
  const resetPassword = `${id}:${user.salt}`;
  await updateUser({
    userId: user.id,
    data: { resetPassword },
  });

  await sendEmail({
    to: email,
    subject: `${config?.appName} | Reset Password`,
    html: render(
      ResetPasswordEmail({
        userName: user.name,
        resetPasswordLink: `${config.domainUrl}/auth/reset-password?key=${resetPassword}`,
      })
    ),
  });

  return responseSuccess("Successfully sent to your email");
}

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function googleAuthAction() {
  return await signIn("google");
}

export async function githubAuthAction() {
  return await signIn("github");
}

export async function facebookAuthAction() {
  return await signIn("facebook");
}

export async function twitterAuthAction() {
  return await signIn("twitter");
}
