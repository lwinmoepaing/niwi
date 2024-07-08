import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prismaClient = globalThis.prisma ?? prismaClientSingleton();

export default prismaClient;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;
