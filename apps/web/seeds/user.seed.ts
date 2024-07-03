import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../libs/hash/hash";
const prisma = new PrismaClient();

type UserType = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
};

const users: UserType[] = [
  {
    name: "Niwi-Admin",
    role: "ADMIN",
    email: "admin@gmail.com",
    password: "123456",
  },
  {
    name: "Niwi-User",
    role: "USER",
    email: "user@gmail.com",
    password: "123456",
  },
] as const;

export default async function executeSeeding() {
  await prisma.$connect();
  console.log("User Seeder is Starting....");

  for (const user of users) {
    try {
      const { hash, salt } = hashPassword(user.password);
      const updateData = { ...user, password: hash, salt };
      await prisma.user.upsert({
        where: { email: user.email },
        update: updateData,
        create: updateData,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  console.log("User Seeder has finished....");
}
