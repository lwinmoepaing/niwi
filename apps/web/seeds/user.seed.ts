import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../libs/hash/hash";
const prisma = new PrismaClient();

type UserType = {
  name: string;
  shortLink: string;
  email: string;
  password: string;
  image: string;
  role: "ADMIN" | "USER";
};

const users: UserType[] = [
  {
    name: "Niwi-Admin",
    shortLink: "niwi.admin",
    role: "ADMIN",
    email: "admin@gmail.com",
    password: "123456",
    image: "/images/auth/admin-profile.png",
  },
  {
    name: "Niwi-User",
    shortLink: "niwi.user",
    role: "USER",
    email: "user@gmail.com",
    password: "123456",
    image: "/images/auth/profile.png",
  },
] as const;

export default async function executeSeeding() {
  await prisma.$connect();
  console.log("User Seeder is Starting....");

  for (const user of users) {
    try {
      const profile = await prisma.userProfile.create({
        data: {
          aboutMe: "",
          aboutMeJson: "",
          statusMessage: "",
          statusMessageJson: "",
          showStatusMessage: true,
          backgroundImage: "",
          gridProfile: [],
        },
      });

      if (profile) {
        const { hash, salt } = hashPassword(user.password);
        const updateData = {
          ...user,
          password: hash,
          salt,
          userProfileId: profile.id,
        };
        await prisma.user.upsert({
          where: { email: user.email },
          update: updateData,
          create: updateData,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  console.log("User Seeder has finished....");
}
