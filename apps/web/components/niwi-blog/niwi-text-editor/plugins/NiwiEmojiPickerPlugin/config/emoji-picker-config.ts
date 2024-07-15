import { customEmoji } from "../../NiwiEmojiPlugin/config/emoji-config";

type EmojiListType = {
  title: string;
  emoji: string;
  type: "text" | "img";
  src: string;
};

let customEmojiList: EmojiListType[] = [];

for (let [key, value] of customEmoji) {
  const [, img] = value[0].split(":");
  customEmojiList.push({
    title: value[0],
    emoji: key,
    type: "img",
    src: `/images/emojis/${img}`,
  });
}

export default [
  {
    title: "Smile",
    emoji: "😀",
    type: "text",
    src: "",
  },
  ...customEmojiList,
] as EmojiListType[];
