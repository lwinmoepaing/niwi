export const customEmoji: Map<string, [string, string]> = new Map([
  // Custom Gif
  [":3", ["emoji-img:meow_party.gif", " "]],
  [":B", ["emoji-img:bo_party.gif", " "]],
  [":F", ["emoji-img:fire_yellow.gif", " "]],
  [":R", ["emoji-img:raiva.gif", " "]],
  [":?", ["emoji-img:meow_question.gif", " "]],
  [":b", ["emoji-img:blog.gif", " "]],
  [":r", ["emoji-img:pink_ribbon.gif", " "]],
  [":C", ["emoji-img:cat_scratch.gif", " "]],
]);

const emojis: Map<string, [string, string]> = new Map([
  [":)", ["emoji happysmile", "🙂"]],
  [":D", ["emoji veryhappysmile", "😀"]],
  [":(", ["emoji unhappysmile", "🙁"]],
  ["<3", ["emoji heart", "❤"]],
  [":smile", ["emoji heart", "❤"]],
  ...customEmoji,
]);

export default emojis;
