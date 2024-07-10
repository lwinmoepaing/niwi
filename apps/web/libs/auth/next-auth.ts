import { createUser, getUserByEmail } from "@/feats/auth/services/auth.service";
import {
  googleAuthSchema,
  LoginFormValues,
} from "@/feats/auth/validations/auth.validation";
import { nanoid } from "nanoid";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { hashPassword, verifyPassword } from "../hash/hash";
import nextAuthEdgeConfig from "./next-auth-for-edge";

const config = {
  ...nextAuthEdgeConfig,
  callbacks: {
    ...nextAuthEdgeConfig.callbacks,
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        const { success, data } = googleAuthSchema.safeParse(profile);
        if (!success) return false;
        try {
          const existUser = await getUserByEmail(data.email);
          if (existUser) {
            user.id = existUser.id;
            user.name = existUser.name;
            user.image = existUser.image;
            return true;
          }

          // New user from Google Authentication
          const password = nanoid();
          const { hash, salt } = hashPassword(password);
          const newUser = await createUser({
            password: hash,
            salt: salt,
            name: data.name,
            email: data.email,
            role: "USER",
            image: data.picture,
          });
          user.id = newUser.id;
        } catch (e) {
          return false;
        }
      }

      if (account?.provider === "github") {
        console.log(profile);
      }

      return true;
    },
  },
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
    GithubProvider({}),
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

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

const nextAuth = NextAuth(config);

export const { GET, POST } = nextAuth.handlers;

export const { auth, signIn, signOut } = nextAuth;
