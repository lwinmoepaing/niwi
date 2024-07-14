import type {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  Spread,
} from "lexical";

import { $applyNodeReplacement, TextNode } from "lexical";

export type SerializedNiwiEmojiNode = Spread<
  {
    className: string;
  },
  SerializedTextNode
>;

export class NiwiEmojiNode extends TextNode {
  __className: string;

  static getType(): string {
    return "emoji";
  }

  static clone(node: NiwiEmojiNode): NiwiEmojiNode {
    return new NiwiEmojiNode(node.__className, node.__text, node.__key);
  }

  constructor(className: string, text: string, key?: NodeKey) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config: EditorConfig): HTMLElement {
    if (this.__className.includes("emoji-img")) {
      const inner = super.createDOM(config);
      inner.className = "emoji-inner";

      const [, img] = this.__className.split(":");
      const emoji = document.createElement("span");
      emoji.style.backgroundImage = img
        ? `url(/images/emojis/${img})`
        : "url(/images/emojis/meow_party.gif)";
      emoji.className = config.theme.niwiEmoji;
      emoji.innerHTML = " ";

      const dom = document.createElement("span");
      dom.className = this.__className;
      dom.appendChild(emoji);
      // dom.appendChild(inner);
      return dom;
    }

    const dom = document.createElement("span");
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = "emoji-inner";
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);
    return false;
  }

  static importJSON(serializedNode: SerializedNiwiEmojiNode): NiwiEmojiNode {
    const node = $createNiwiEmojiNode(
      serializedNode.className,
      serializedNode.text
    );
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedNiwiEmojiNode {
    return {
      ...super.exportJSON(),
      className: this.getClassName(),
      type: "emoji",
    };
  }

  getClassName(): string {
    const self = this.getLatest();
    return self.__className;
  }
}

export function $isNiwiEmojiNode(
  node: LexicalNode | null | undefined
): node is NiwiEmojiNode {
  return node instanceof NiwiEmojiNode;
}

export function $createNiwiEmojiNode(
  className: string,
  emojiText: string
): NiwiEmojiNode {
  const node = new NiwiEmojiNode(className, emojiText).setMode("token");
  return $applyNodeReplacement(node);
}
