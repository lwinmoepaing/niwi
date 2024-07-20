import { customEmoji } from "../../NiwiEmojiPlugin/config/emoji-config";

type EmojiListType = {
  title: string;
  emoji: string;
  type: "text" | "img";
  src: string;
};

const customEmojiList: EmojiListType[] = [];

for (const [key, value] of customEmoji) {
  const [, img] = value[0].split(":");
  customEmojiList.push({
    title: value[0],
    emoji: key,
    type: "img",
    src: `/images/emojis/${img}`,
  });
}

export default [...customEmojiList] as EmojiListType[];
