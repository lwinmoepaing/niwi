import localFont from "next/font/local";
import { Nunito } from "next/font/google";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const lancelotFont = localFont({
  src: "./fonts/Lancelot-Regular.woff",
  variable: "--font-lancelot-regular",
});

export const nunitoFont = Nunito({ subsets: ["latin"] });
