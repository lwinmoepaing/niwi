import {
  EditorConfig,
  LexicalNode,
  SerializedTextNode,
  TextNode,
} from "lexical";

const CAPTION_NODE_TYPE = "niwi-image-caption-node" as const;

// Define the serialized format for the custom text node
interface SerializedNiwiImageCaptionNode extends SerializedTextNode {
  type: typeof CAPTION_NODE_TYPE;
}

// Extend the TextNode class
export class NiwiImageCaptionNode extends TextNode {
  static getType(): string {
    return CAPTION_NODE_TYPE;
  }

  static clone(node: NiwiImageCaptionNode): NiwiImageCaptionNode {
    return new NiwiImageCaptionNode(node.__text, node.__key);
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
    serializedNode: SerializedNiwiImageCaptionNode
  ): NiwiImageCaptionNode {
    const node = new NiwiImageCaptionNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedNiwiImageCaptionNode {
    return {
      ...super.exportJSON(),
      type: CAPTION_NODE_TYPE,
    };
  }
}

export function $createNiwiImageCaptionNode(text: string): NiwiImageCaptionNode {
  return new NiwiImageCaptionNode(text);
}

export function $isNiwiImageCaptionNode(
  node: LexicalNode | null | undefined
): node is NiwiImageCaptionNode {
  return node instanceof NiwiImageCaptionNode;
}
