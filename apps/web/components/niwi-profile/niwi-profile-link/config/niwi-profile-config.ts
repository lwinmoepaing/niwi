import { nanoid } from "nanoid";

export type SizeType = "half" | "full" | "square" | "sixty";

export type LinkCardType = {
  id: string;
  type: "discord" | "youtube" | "github" | "linkedin" | "other";
  size: SizeType;
  image: string;
  link: string;
  title: string;
  youtubeInfo?: {
    subscribeCount: string;
    videoCount: string;
  };
};

export type LinkCardYoutubeType = LinkCardType["youtubeInfo"];

export const acceptableType = [
  "discord",
  "youtube",
  "github",
  "linkedin",
  "other",
];

export const profileDefaultList: LinkCardType[] = [
  {
    id: "Olf0XS-Asy3U8bu6qS0_H",
    image: "",
    link: "https://github.com/lwinmoepaing",
    size: "full",
    title: "Lwin Moe Paing",
    type: "github",
  },
  {
    id: "G9fo0CRkgzMlEfYLPEq41",
    type: "youtube",
    size: "full",
    image: "",
    link: "https://youtube.com/@lwinmoepaingdev",
    title: "Lwin Moe Paing",
    youtubeInfo: {
      subscribeCount: "148",
      videoCount: "4",
    },
  },
];

export const makeGitHubCard = (name: string, link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "github",
    size: "square",
    image: "",
    link,
    title: name,
  };
};

export const makeYoutubeCard = (
  name: string,
  link: string,
  youtubeInfo: LinkCardYoutubeType
): LinkCardType => {
  return {
    id: nanoid(),
    type: "youtube",
    size: "square",
    image: "",
    link,
    title: name,
    youtubeInfo,
  };
};
