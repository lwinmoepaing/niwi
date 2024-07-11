import "server-only";
import prismaClient from "@/libs/db/prismaClient";

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
  github_id?: string;
};
export const createUser = (user: CreateUserProps) => {
  return prismaClient.user.create({ data: user });
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
