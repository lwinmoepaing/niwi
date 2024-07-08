import { getUserByEmail } from "@/feats/auth/services/auth.service";
import { LoginFormValues } from "@/feats/auth/validations/auth.validation";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "../hash/hash";
import nextAuthEdgeConfig from "./next-auth-for-edge";
// import DiscordProvider from "next-auth/providers/discord";

const config = {
  ...nextAuthEdgeConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    }),
    Credentials({
      async authorize(credentials) {
        // Run on Login State
        const { email, password } = credentials as LoginFormValues;
        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("User not found");
        }

        const isCorrectPassword = verifyPassword({
          canditatePassword: password,
          salt: user.salt,
          hash: user.password,
        });

        if (!isCorrectPassword) {
          throw new Error("Do you forgot your password?");
        }

        console.log("Authenticated!!");

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

const nextAuth = NextAuth(config);

export const { GET, POST } = nextAuth.handlers;

export const { auth, signIn, signOut } = nextAuth;
