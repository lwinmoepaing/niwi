import NextAuth from "next-auth";

import nextAuthEdgeConfig from "@/libs/auth/next-auth-for-edge";

export default NextAuth(nextAuthEdgeConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)"],
};
