import type { LexicalEditor } from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import { useEffect } from "react";

import { $createNiwiEmojiNode, NiwiEmojiNode } from "./nodes/NiwiEmojiNode";
import emojis from "./config/emoji-config";

function $findAndTransformEmoji(node: TextNode): null | TextNode {
  const text = node.getTextContent();

  for (let i = 0; i < text.length; i++) {
    const t = text[i] as string;
    const emojiData = emojis.get(t) || emojis.get(text.slice(i, i + 2));

    if (emojiData !== undefined) {
      const [emojiStyle, emojiText] = emojiData;
      let targetNode;

      if (i === 0) {
        [targetNode] = node.splitText(i + 2);
      } else {
        [, targetNode] = node.splitText(i, i + 2);
      }

      const emojiNode = $createNiwiEmojiNode(emojiStyle, emojiText);
      targetNode?.replace?.(emojiNode);
      return emojiNode;
    }
  }

  return null;
}

function $textNodeTransform(node: TextNode): void {
  let targetNode: TextNode | null = node;

  while (targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return;
    }

    targetNode = $findAndTransformEmoji(targetNode);
  }
}

function useEmojis(editor: LexicalEditor): void {
  useEffect(() => {
    if (!editor.hasNodes([NiwiEmojiNode])) {
      throw new Error("EmojisPlugin: EmojiNode not registered on editor");
    }

    return editor.registerNodeTransform(TextNode, $textNodeTransform);
  }, [editor]);
}

export default function NiwiEmojiPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEmojis(editor);
  return null;
}
