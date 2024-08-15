import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from "lexical";

import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import NiwiTwitter from "../components/NiwiTwitter";

export type SerializedNiwiTwitterNode = Spread<
  {
    id: string;
  },
  SerializedDecoratorBlockNode
>;

function $convertTwitterElement(
  domNode: HTMLElement
): null | DOMConversionOutput {
  const id = domNode.getAttribute("data-lexical-twitter-id");
  if (id) {
    const node = $createNiwiTwitterNode(id);
    return { node };
  }
  return null;
}

export class NiwiTwitterNode extends DecoratorBlockNode {
  __id: string;

  static getType(): string {
    return "twitter";
  }

  static clone(node: NiwiTwitterNode): NiwiTwitterNode {
    return new NiwiTwitterNode(node.__id, node.__format, node.__key);
  }

  static importJSON(
    serializedNode: SerializedNiwiTwitterNode
  ): NiwiTwitterNode {
    const node = $createNiwiTwitterNode(serializedNode.id);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedNiwiTwitterNode {
    return {
      ...super.exportJSON(),
      type: "twitter",
      version: 1,
      id: this.__id,
    };
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__id = id;
  }

  exportDOM(): DOMExportOutput {
    const container = document.createElement("div");
    container.setAttribute("data-lexical-twitter-id", this.__id);
    container.classList.add("niwi-twitter-container");

    const element = document.createElement("div");
    element.classList.add("twitter-wrapper");

    const text = document.createTextNode(this.getTextContent());
    element.append(text);
    container.append(element);
    return { element: container };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-twitter-id")) {
          return null;
        }
        return {
          conversion: $convertTwitterElement,
          priority: 1,
        };
      },
    };
  }

  updateDOM(): false {
    return false;
  }

  getId(): string {
    return this.__id;
  }

  getTextContent(
    // eslint-disable-next-line no-unused-vars
    _includeInert?: boolean | undefined,
    // eslint-disable-next-line no-unused-vars
    _includeDirectionless?: false | undefined
  ): string {
    return `https://x.com/i/web/status/${this.__id}`;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || "niwi-twitter-container",
      focus: embedBlockTheme.focus || "",
    };
    return (
      <NiwiTwitter
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        loadingComponent="Loading..."
        tweetID={this.__id}
        onError={() => {
          try {
            this?.remove();
          } catch (e) {
            console.log(e);
          }
        }}
      />
    );
  }
}

export function $createNiwiTwitterNode(tweetID: string): NiwiTwitterNode {
  return new NiwiTwitterNode(tweetID);
}

export function $isNiwiTwitterNode(
  node: NiwiTwitterNode | LexicalNode | null | undefined
): node is NiwiTwitterNode {
  return node instanceof NiwiTwitterNode;
}
