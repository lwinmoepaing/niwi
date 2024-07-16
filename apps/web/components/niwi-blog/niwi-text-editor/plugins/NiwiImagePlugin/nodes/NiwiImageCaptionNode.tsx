import {
  EditorConfig,
  LexicalNode,
  SerializedTextNode,
  TextNode,
} from "lexical";

const CAPTION_NODE_TYPE = "niwi-image-caption-node" as const;

// Define the serialized format for the custom text node
interface SerializedNiwiCaptionNode extends SerializedTextNode {
  type: typeof CAPTION_NODE_TYPE;
}

// Extend the TextNode class
export class NiwiCaptionNode extends TextNode {
  static getType(): string {
    return CAPTION_NODE_TYPE;
  }

  static clone(node: NiwiCaptionNode): NiwiCaptionNode {
    return new NiwiCaptionNode(node.__text, node.__key);
  }

  // Optionally, add any custom behavior or properties
  // constructor(text: string, key?: NodeKey) {
  //   super(text, key);
  // }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    // Optionally, customize the DOM element
    // dom.style.color = "blue"; // Example: Change text color
    return dom;
  }

  static importJSON(
    serializedNode: SerializedNiwiCaptionNode
  ): NiwiCaptionNode {
    const node = new NiwiCaptionNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedNiwiCaptionNode {
    return {
      ...super.exportJSON(),
      type: CAPTION_NODE_TYPE,
    };
  }
}

export function $createNiwiCaptionNode(text: string): NiwiCaptionNode {
  return new NiwiCaptionNode(text);
}

export function $isNiwiCaptionNode(
  node: LexicalNode | null | undefined
): node is NiwiCaptionNode {
  return node instanceof NiwiCaptionNode;
}
