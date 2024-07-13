"use server";
import { cookies } from "next/headers";

const DARKMODE_KEY = "niwiDarkMode";

export const setDarkModeCookie = (value: boolean) => {
  cookies().set({
    name: DARKMODE_KEY,
    value: value.toString(),
    path: "/",
    priority: "high",
  });
};

export const getDarkModeCookie = async () => {
  const isDarkMode = await cookies().get(DARKMODE_KEY);
  return isDarkMode?.value === "true";
};
