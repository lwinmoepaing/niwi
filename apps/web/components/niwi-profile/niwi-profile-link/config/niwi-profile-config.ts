import { nanoid } from "nanoid";

export type SizeType = "half" | "full" | "square" | "sixty";

export type LinkCardType = {
  id: string;
  type:
    | "discord"
    | "youtube"
    | "github"
    | "linkedin"
    | "sportify"
    | "buymecoffee"
    | "other";
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
  "sportify",
  "buymecoffee",
  "other",
];

export const profileDefaultList: LinkCardType[] = [
  {
    id: "Olf0XS-Asy3U8bu6qS0_H",
    type: "github",
    image: "",
    link: "https://github.com/lwinmoepaing",
    size: "full",
    title: "Lwin Moe Paing",
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
  {
    id: "EfnxOEV4eFgX-AY3GMUe4",
    type: "sportify",
    size: "square",
    image: "",
    link: "https://open.spotify.com/user/31kyur6qv3ornwaaogjurolrhsqa",
    title: "Sportify",
  },
  {
    id: "RrQhsiG3WM-euSTD5vZJe",
    type: "buymecoffee",
    size: "square",
    image: "",
    link: "https://buymeacoffee.com/lwinmoepaing",
    title: "Buy Me a Coffee",
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

export const makeSportifyCard = (link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "sportify",
    size: "square",
    image: "",
    link,
    title: "Sportify",
  };
};

export const makeBuyMeACoffeeCard = (link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "buymecoffee",
    size: "square",
    image: "",
    link,
    title: "Buy Me a Coffee",
  };
};
