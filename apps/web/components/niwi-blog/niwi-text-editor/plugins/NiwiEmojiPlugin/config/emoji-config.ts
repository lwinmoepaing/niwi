const emojis: Map<string, [string, string]> = new Map([
  [":)", ["emoji happysmile", "🙂"]],
  [":D", ["emoji veryhappysmile", "😀"]],
  [":(", ["emoji unhappysmile", "🙁"]],
  ["<3", ["emoji heart", "❤"]],

  // Custom Gif
  [":3", ["emoji-img:meow_party.gif", " "]],
  [":B", ["emoji-img:bo_party.gif", " "]],
  [":F", ["emoji-img:fire_yellow.gif", " "]],
  [":R", ["emoji-img:raiva.gif", " "]],
  [":?", ["emoji-img:meow_question.gif", " "]],
  [":b", ["emoji-img:blog.gif", " "]],
]);

export default emojis;
