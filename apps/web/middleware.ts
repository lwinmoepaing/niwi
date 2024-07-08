import NextAuth from "next-auth";

import nextAuthEdgeConfig from "@/libs/auth/next-auth-for-edge";

const { auth } = NextAuth(nextAuthEdgeConfig);

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)"],
};
