import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import NiwiTwitterText from "../components/NiwiTwitterText";

export type NiwiTwitterTextPropsType = {
  placeholder: string;
};

type SerializedNiwiTwitterText = Spread<
  NiwiTwitterTextPropsType,
  SerializedLexicalNode
>;

export const NIWI_TWITTER_PLUGIN_TYPE = "Niwi-Twitter-Text-Node";

const ATTR = {
  container: "data-editor-niwi-twitter-placeholder-container",
  placeholder: "data-editor-niwi-twitter-placeholder",
};

const KLASS = {
  container: "niwi-editor-twitter-placeholder-container",
};

export const $getDataFromNiwiImageDom = (
  domNode: HTMLDivElement
): NiwiTwitterTextPropsType => {
  const placeholder = (domNode.getAttribute(ATTR.placeholder) || "") as string;

  return {
    placeholder,
  };
};

export function convertNiwiImage(
  domNode: HTMLDivElement
): DOMConversionOutput | null {
  const data = $getDataFromNiwiImageDom(domNode);
  const node = $createNiwiTwitterText(data);
  return {
    node,
  };
}

export class NiwiTwitterTextNode extends DecoratorNode<JSX.Element> {
  __placeholder: string;

  constructor(placeholder: string, key?: NodeKey) {
    super(key);
    this.__placeholder = placeholder;
  }

  static getType(): string {
    return NIWI_TWITTER_PLUGIN_TYPE;
  }

  static clone(node: NiwiTwitterTextNode): NiwiTwitterTextNode {
    return new NiwiTwitterTextNode(node.__placeholder, node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.classList.add(KLASS.container);
    dom.setAttribute(ATTR.container, "true");
    dom.setAttribute(ATTR.placeholder, this.__placeholder || "");
    return dom;
  }

  updateDOM(prevNode: NiwiTwitterTextNode, dom: HTMLDivElement): boolean {
    if (prevNode.__placeholder !== this.__placeholder) {
      dom.setAttribute(ATTR.placeholder, this.__placeholder);
    }

    return false;
  }

  static importDOM(): DOMConversionMap<HTMLDivElement> | null {
    return {
      div: (domNode: HTMLDivElement) => {
        if (!domNode.hasAttribute(ATTR.container)) {
          return null;
        }

        return {
          conversion: convertNiwiImage,
          priority: 1,
        };
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement("div");
    element.classList.add(KLASS.container);
    element.setAttribute(ATTR.container, "true");
    element.setAttribute(ATTR.placeholder, this.__placeholder);
    return { element };
  }

  static importJSON(
    serializedNode: SerializedNiwiTwitterText
  ): NiwiTwitterTextNode {
    const node = $createNiwiTwitterText({
      ...serializedNode,
    });
    return node;
  }

  override exportJSON(): SerializedNiwiTwitterText {
    return {
      type: NIWI_TWITTER_PLUGIN_TYPE,
      ...this.getData(),
      version: 1,
    };
  }

  getPlaceholder(): string {
    return this.getLatest().__placeholder;
  }

  setPlaceholder(value: string): void {
    const writable = this.getWritable();
    writable.__placeholder = value;
  }

  getData(): NiwiTwitterTextPropsType {
    const latestData = this.getLatest();
    return {
      placeholder: latestData.__placeholder,
    };
  }

  updateData(data: NiwiTwitterTextPropsType) {
    const writable = this.getWritable();
    writable.__placeholder = data.placeholder;
  }

  decorate(): JSX.Element {
    return (
      <NiwiTwitterText
        nodeKey={this.getKey()}
        placeholder={this.__placeholder}
      />
    );
  }
}

export function $createNiwiTwitterText({
  placeholder,
}: NiwiTwitterTextPropsType): NiwiTwitterTextNode {
  return new NiwiTwitterTextNode(placeholder);
}

export function $isNiwiTwitterText(
  node: LexicalNode | null | undefined
): node is NiwiTwitterTextNode {
  return node instanceof NiwiTwitterTextNode;
}
