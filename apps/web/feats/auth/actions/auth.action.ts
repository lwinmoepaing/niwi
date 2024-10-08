"use server";

import config from "@/config";
import ResetPasswordMail from "@/feats/mail/template/reset-password.mail";
import MagicLinkMail from "@/feats/mail/template/magic-link.mail";
import { signIn, signOut } from "@/libs/auth/next-auth";
import {
  decryptText,
  encryptText,
  hashPassword,
  hashPasswordBySalt,
} from "@/libs/hash/hash";
import { sendEmail } from "@/libs/mail/mailgun";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { User } from "@prisma/client";
import { render } from "@react-email/render";
import { nanoid } from "nanoid";
import { AuthError } from "next-auth";
import {
  checkResetPasswordKeyValid,
  createUser,
  createUserProfile,
  getUserByEmail,
  updateUser,
} from "../services/auth.service";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
  LoginFormValues,
  MagicLinkFormValues,
  magicLinkSchema,
  ResetPasswordFormValues,
  resetPasswordSchema,
  signUpFormSchema,
  SignUpFormValues,
} from "../validations/auth.validation";
import dateUtil from "@/libs/date/date-util";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function magicLinkAction(
  _currentState: unknown,
  authData: LoginFormValues
) {
  try {
    await signIn("credentials", authData);
    // return responseSuccess("Successfully logged in");
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

    if (isRedirectError(error)) {
      return { message: "Redirect" };
    }

    throw error;
  }
}

export async function loginAction(
  _currentState: unknown,
  authData: LoginFormValues
) {
  try {
    await signIn("credentials", authData);
    // return responseSuccess("Successfully logged in");
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

    if (isRedirectError(error)) {
      return { message: "Redirect" };
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

    const profile = await createUserProfile();

    const { hash, salt } = hashPassword(password);
    const newUserData = {
      name,
      email,
      shortLink: nanoid(),
      userProfileId: profile.id,
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

export async function forgotPasswordAction(
  _currentState: unknown,
  data: ForgotPasswordFormValues
) {
  try {
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
    const tokenExpire = dateUtil().add(1, "hour").toString();
    const resetPassword = `${id}~${user.salt}~${email}~${tokenExpire}`;
    await updateUser({
      userId: user.id,
      data: { resetPassword },
    });

    await sendEmail({
      to: email,
      subject: `${config?.appName} | Reset Password`,
      html: render(
        ResetPasswordMail({
          userName: user.name,
          resetPasswordLink: `${config.domainUrl}/auth/reset-password?resetPasswordKey=${resetPassword}`,
        })
      ),
    });

    return responseSuccess("Successfully sent to your email");
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
}

export async function resetPasswordAction(
  _currentState: unknown,
  formData: ResetPasswordFormValues
) {
  try {
    const { error, data } = resetPasswordSchema.safeParse(formData);
    if (error) {
      return responseError("", error.format());
    }

    const checkReset = await checkResetPasswordKeyValid(data.resetPasswordKey);

    if (!checkReset.success) {
      return responseError(checkReset.message);
    }

    const user = checkReset.data as User;
    const newPassword = hashPasswordBySalt(data.password, user.salt);

    const updatedUser = await updateUser({
      userId: user.id,
      data: { password: newPassword, resetPassword: "" },
    });

    return responseSuccess("Successfully update password", updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
}

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function magicLinkRequestAction(
  _currentState: unknown,
  data: MagicLinkFormValues
) {
  try {
    const { error } = magicLinkSchema.safeParse(data);
    if (error) {
      return responseError("", error.format());
    }

    const { email } = data;
    const user = await getUserByEmail(email);
    if (!user) {
      return responseError("Your email address is not found");
    }

    const id = nanoid();
    const encryptEmail = encodeURI(encryptText(email, config.secretKey));
    const tokenExpire = dateUtil().add(10, "minute").toString();
    const magicLink = `${encryptEmail}~${id}~${user.salt}~${tokenExpire}`;

    await sendEmail({
      to: email,
      subject: `${config?.appName} | Login with email`,
      html: render(
        MagicLinkMail({
          userName: user.name,
          magicLink: `${config.domainUrl}/auth/magic-link?magicKey=${magicLink}`,
        })
      ),
    });

    return responseSuccess("Successfully sent to your email");
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
}

export async function magicLinkSignInAction(
  _currentState: unknown,
  magicKey: string
) {
  const [encryptEmail] = magicKey.split("~");

  if (!encryptEmail) return responseError("Invalid magic key email.");

  const email = decryptText(encryptEmail?.replace(/ /g, "+"), config.secretKey);

  try {
    await signIn("credentials", { email, type: "MAGIC_LINK" } as const);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return responseError(error.cause?.err.message);
      }
    }
    if (isRedirectError(error)) {
      return responseError("Redirect");
    }
    throw error;
  }
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
