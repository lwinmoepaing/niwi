"use server";

import { signIn, signOut } from "@/libs/auth/next-auth";
import { AuthError } from "next-auth";
import {
  LoginFormValues,
  signUpFormSchema,
  SignUpFormValues,
} from "../validations/auth.validation";
import { createUser, getUserByEmail } from "../services/auth.service";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { hashPassword } from "@/libs/hash/hash";
import config from "@/config";

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
      return responseError("User is already exist");
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

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function googleAuthAction(_currentState: unknown) {
  return await signIn("google");
}

export async function githubAuthAction(_currentState: unknown) {
  return await signIn("github");
}
