import {
  createUser,
  getUserByEmail,
  getUserByFacebookIdOrEmail,
  getUserByGithubIdOrEmail,
  getUserByTwitterId,
} from "@/feats/auth/services/auth.service";
import {
  facebookAuthSchema,
  githubAuthSchema,
  googleAuthSchema,
  LoginFormValues,
  magicLinkAuthSchema,
  twitterAuthSchema,
} from "@/feats/auth/validations/auth.validation";
import { nanoid } from "nanoid";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import { hashPassword, verifyPassword } from "../hash/hash";
import nextAuthEdgeConfig from "./next-auth-for-edge";
import appConfig from "@/config";

const createNewUserForOAuth = async (
  name: string,
  email: string,
  image: string,
  option: {
    provider?: "facebook" | "twitter" | "google" | "github";
    id?: string;
  } = {}
) => {
  const password = nanoid();
  const { hash, salt } = hashPassword(password);
  const { provider, id } = option;
  const newUser = await createUser({
    password: hash,
    salt: salt,
    name,
    email: !email ? undefined : email,
    role: "USER",
    image,
    github_id: provider === "github" ? id : undefined,
  });
  return newUser;
};

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
          const newUser = await createNewUserForOAuth(
            data.name,
            data.email,
            data.picture
          );
          user.id = newUser.id;
        } catch (e) {
          return false;
        }
      }

      if (account?.provider === "github") {
        const { success, data } = githubAuthSchema.safeParse(profile);
        if (!success) return false;
        try {
          const existUser = await getUserByGithubIdOrEmail({
            email: data.email,
            githubId: data.id,
          });
          if (existUser) {
            user.id = existUser.id;
            user.name = existUser.name;
            user.image = existUser.image;
            return true;
          }
          // New user from Github Authentication
          const newUser = await createNewUserForOAuth(
            data.name,
            data.email,
            data.avatar_url,
            { provider: "github", id: data.id.toString() }
          );
          user.id = newUser.id;
        } catch (e) {
          return false;
        }
      }

      if (account?.provider === "facebook") {
        const { success, data } = facebookAuthSchema.safeParse(profile);
        if (!success) return false;
        try {
          const existUser = await getUserByFacebookIdOrEmail({
            email: data.email,
            facebookId: data.id,
          });
          if (existUser) {
            user.id = existUser.id;
            user.name = existUser.name;
            user.image = existUser.image;
            return true;
          }
          // New user from Facebook Authentication
          const newUser = await createNewUserForOAuth(
            data.name,
            data.email,
            appConfig.defaultUserImage
          );
          user.id = newUser.id;
          user.image = newUser.image;
        } catch (e) {
          return false;
        }
      }

      if (account?.provider === "twitter") {
        const { success, data } = twitterAuthSchema.safeParse(profile);
        if (!success) return false;

        try {
          const existUser = await getUserByTwitterId(data.data.id);
          if (existUser) {
            user.id = existUser.id;
            user.name = existUser.name;
            user.image = existUser.image;
            return true;
          }

          // New user from Twitter Authentication
          // Warning: Twitter Oauth@v2 don't give user's email address.
          const newUser = await createNewUserForOAuth(
            data.data.name,
            "",
            appConfig.defaultUserImage
          );
          user.id = newUser.id;
          user.image = newUser.image;
        } catch (e) {
          return false;
        }
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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
    }),
    Credentials({
      async authorize(credentials) {
        // Magic Link Authentication
        const { success, data } = magicLinkAuthSchema.safeParse(credentials);
        if (success) {
          const { email } = data;
          const user = await getUserByEmail(email);

          if (!user) {
            throw new Error("User not found");
          }

          return user;
        }

        // Run on Normal Login State
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
