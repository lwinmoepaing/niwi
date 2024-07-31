import { nanoid } from "nanoid";

export type SizeType = "half" | "full" | "square" | "sixty";

export type LinkCardType = {
  id: string;
  type: "discord" | "youtube" | "github" | "linkedin" | "other";
  size: SizeType;
  image: string;
  link: string;
  title: string;
};

export const acceptableType = [
  "discord",
  "youtube",
  "github",
  "linkedin",
  "other",
];

export const profileDefaultList: LinkCardType[] = [
  {
    id: nanoid(),
    type: "discord",
    size: "half",
    link: "https://discordapp.com",
    image: "",
    title: "Discord",
  },
  {
    id: nanoid(),
    type: "youtube",
    size: "half",
    link: "https://discordapp.com",
    image: "",
    title: "Youtube",
  },
  {
    id: nanoid(),
    type: "github",
    size: "full",
    link: "https://githubapp.com",
    image: "",
    title: "Github",
  },
  {
    id: nanoid(),
    type: "linkedin",
    size: "full",
    link: "https://discordapp.com",
    image: "",
    title: "Linkedin",
  },
];
