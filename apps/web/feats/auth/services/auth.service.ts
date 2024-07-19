import "server-only";

import config from "@/config";
import dateUtil from "@/libs/date/date-util";
import prismaClient from "@/libs/db/prismaClient";
import { decryptText } from "@/libs/hash/hash";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";

export const getUserByEmail = (email: string) => {
  return prismaClient.user.findUnique({ where: { email } });
};

type CreateUserProps = {
  password: string;
  salt: string;
  name: string;
  email?: string;
  image: string;
  role: "ADMIN" | "USER";
  githubId?: string;
  facebookId?: string;
  twitterId?: string;
};
export const createUser = (user: CreateUserProps) => {
  return prismaClient.user.create({
    data: user,
  });
};

type UpdateUserProps = {
  userId: string;
  data: {
    email?: string;
    image?: string;
    name?: string;
    resetPassword?: string;
    password?: string;
  };
};

export const updateUser = ({ data, userId }: UpdateUserProps) => {
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

export const getUserByGithubIdOrEmail = async ({
  email,
  githubId,
}: {
  email: string;
  githubId: number;
}) => {
  let user = null;

  // First, try to find the user by GitHub ID
  if (githubId) {
    user = await prismaClient.user.findUnique({
      where: { githubId: githubId.toString() },
    });
  }

  // If not found by GitHub ID, or if GitHub ID is not provided, try to find the user by email
  if (!user && email) {
    user = await prismaClient.user.findUnique({
      where: { email },
    });
  }

  return user;
};

export const getUserByFacebookIdOrEmail = async ({
  email,
  facebookId,
}: {
  email: string;
  facebookId: string;
}) => {
  let user = null;

  // First, try to find the user by Facebook ID
  if (facebookId) {
    user = await prismaClient.user.findUnique({
      where: { facebookId: facebookId },
    });
  }

  // If not found by Facebook ID, or if Facebook ID is not provided, try to find the user by email
  if (!user && email) {
    user = await prismaClient.user.findUnique({
      where: { email },
    });
  }

  return user;
};

export const getUserByTwitterId = async (twitterId: string) => {
  return prismaClient.user.findUnique({
    where: { twitterId: twitterId },
  });
};

export const checkResetPasswordKeyValid = async (resetPasswordKey: string) => {
  const [id, salt, email, tokenTime] = resetPasswordKey.split("~");

  if (!id || !salt || !tokenTime || !email) {
    return responseError("Invalid reset password route.");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return responseError("Invalid user email with token key.");
  }

  if (!user.resetPassword) {
    return responseError("Reset password token is expired.");
  }

  const isSameSalt = user.salt === salt;
  if (!isSameSalt) {
    return responseError("Invalid reset password key.");
  }

  const now = dateUtil();
  const tokenExpire = dateUtil(tokenTime);
  const isExpire = now.isAfter(tokenExpire);
  if (isExpire) {
    return responseError("Reset token is expired.");
  }

  return responseSuccess("Reset password key is valid", user);
};

export const checkMagicKeyValid = async (magicKey: string) => {
  const [encryptEmail, id, salt, tokenTime] = magicKey.split("~");

  if (!id || !salt || !tokenTime || !encryptEmail) {
    return responseError("Invalid Magic key.");
  }

  const email = decryptText(encryptEmail?.replace(/ /g, "+"), config.secretKey);
  const user = await getUserByEmail(email);
  if (!user) {
    return responseError("Invalid user email with Magic key.");
  }

  const isSameSalt = user.salt === salt;
  if (!isSameSalt) {
    return responseError("Invalid Magic key.");
  }

  const now = dateUtil();
  const tokenExpire = dateUtil(tokenTime);
  const isExpire = now.isAfter(tokenExpire);
  if (isExpire) {
    return responseError("Magic token is expired.");
  }

  return responseSuccess("Magic key is valid", user);
};
