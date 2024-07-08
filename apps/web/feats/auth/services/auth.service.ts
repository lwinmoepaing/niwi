import "server-only";
import prismaClient from "@/libs/db/prismaClient";

export const getUserByEmail = (email: string) => {
  return prismaClient.user.findUnique({ where: { email } });
};

type CreateUserProps = {
  password: string;
  salt: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};
export const createUser = (user: CreateUserProps) => {
  return prismaClient.user.create({ data: user });
};
