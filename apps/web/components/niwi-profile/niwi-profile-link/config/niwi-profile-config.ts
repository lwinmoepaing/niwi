import { nanoid } from "nanoid";

export type SizeType = "half" | "full" | "square" | "sixty";

export type LinkCardType = {
  id: string;
  type:
    | "discord"
    | "youtube"
    | "github"
    | "linkedin"
    | "instagram"
    | "spotify"
    | "buymecoffee"
    | "facebook"
    | "twitter"
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
  "facebook",
  "twitter",
  "instagram",
  "github",
  "linkedin",
  "spotify",
  "buymecoffee",
  "other",
];

export const profileDefaultList: LinkCardType[] = [
  {
    id: "Olf0XS-Asy3U8bu6qS0_H",
    type: "github",
    image: "",
    link: "https://github.com/lwinmoepaing",
    size: "square",
    title: "Lwin Moe Paing",
  },
  {
    id: "G9fo0CRkgzMlEfYLPEq41",
    type: "youtube",
    size: "square",
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
    type: "spotify",
    size: "square",
    image: "",
    link: "https://open.spotify.com/user/31kyur6qv3ornwaaogjurolrhsqa",
    title: "Spotify",
  },
  {
    id: "RrQhsiG3WM-euSTD5vZJe",
    type: "buymecoffee",
    size: "square",
    image: "",
    link: "https://buymeacoffee.com/lwinmoepaing",
    title: "Buy Me a Coffee",
  },
  {
    id: "wd98Nyanh-syRlu-cKUGr",
    type: "facebook",
    size: "square",
    image: "",
    link: "https://www.facebook.com/lwin.im",
    title: "Facebook",
  },
  {
    id: "WOtC6yYCesluuKX39HjAI",
    type: "twitter",
    size: "square",
    image: "",
    link: "https://x.com/LwinMoePaingDev",
    title: "Twitter",
  },
  {
    id: "zzWOtC6yYCesluuKX39HjAI",
    type: "instagram",
    size: "square",
    image: "",
    link: "https://x.com/LwinMoePaingDev",
    title: "Instagram",
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

export const makeSpotifyCard = (link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "spotify",
    size: "square",
    image: "",
    link,
    title: "Spotify",
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

export const makeFacebookCard = (link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "facebook",
    size: "square",
    image: "",
    link,
    title: "Facebook",
  };
};

export const makeTwitterCard = (link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "twitter",
    size: "square",
    image: "",
    link,
    title: "Twitter",
  };
};
export const makeInstagramCard = (link: string): LinkCardType => {
  return {
    id: nanoid(),
    type: "instagram",
    size: "square",
    image: "",
    link,
    title: "Instagram",
  };
};
