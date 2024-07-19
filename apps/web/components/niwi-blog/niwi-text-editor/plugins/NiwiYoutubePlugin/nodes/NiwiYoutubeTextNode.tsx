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
import NiwiYoutubeText from "../components/NiwiYoutubeText";

export type NiwiYoutubeTextPropsType = {
  placeholder: string;
};

type SerializedNiwiYoutubeText = Spread<
  NiwiYoutubeTextPropsType,
  SerializedLexicalNode
>;

export const NIWI_YOUTUBE_PLUGIN_TYPE = "Niwi-Youtube-Text-Node";

const ATTR = {
  container: "data-editor-niwi-youtube-placeholder-container",
  placeholder: "data-editor-niwi-youtube-placeholder",
};

const KLASS = {
  container: "niwi-editor-youtube-placeholder-container",
};

export const $getDataFromNiwiImageDom = (
  domNode: HTMLDivElement
): NiwiYoutubeTextPropsType => {
  const placeholder = (domNode.getAttribute(ATTR.placeholder) || "") as string;

  return {
    placeholder,
  };
};

export function convertNiwiImage(
  domNode: HTMLDivElement
): DOMConversionOutput | null {
  const data = $getDataFromNiwiImageDom(domNode);
  const node = $createNiwiYoutubeText(data);
  return {
    node,
  };
}

export class NiwiYoutubeTextNode extends DecoratorNode<JSX.Element> {
  __placeholder: string;

  constructor(placeholder: string, key?: NodeKey) {
    super(key);
    this.__placeholder = placeholder;
  }

  static getType(): string {
    return NIWI_YOUTUBE_PLUGIN_TYPE;
  }

  static clone(node: NiwiYoutubeTextNode): NiwiYoutubeTextNode {
    return new NiwiYoutubeTextNode(node.__placeholder, node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.classList.add(KLASS.container);
    dom.setAttribute(ATTR.container, "true");
    dom.setAttribute(ATTR.placeholder, this.__placeholder || "");
    return dom;
  }

  updateDOM(prevNode: NiwiYoutubeTextNode, dom: HTMLDivElement): boolean {
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

  exportDOM(_editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement("div");
    element.classList.add(KLASS.container);
    element.setAttribute(ATTR.container, "true");
    element.setAttribute(ATTR.placeholder, this.__placeholder);
    return { element };
  }

  static importJSON(
    serializedNode: SerializedNiwiYoutubeText
  ): NiwiYoutubeTextNode {
    const node = $createNiwiYoutubeText({
      ...serializedNode,
    });
    return node;
  }

  override exportJSON(): SerializedNiwiYoutubeText {
    return {
      type: NIWI_YOUTUBE_PLUGIN_TYPE,
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

  getData(): NiwiYoutubeTextPropsType {
    const latestData = this.getLatest();
    return {
      placeholder: latestData.__placeholder,
    };
  }

  updateData(data: NiwiYoutubeTextPropsType) {
    const writable = this.getWritable();
    writable.__placeholder = data.placeholder;
  }

  decorate(): JSX.Element {
    return (
      <NiwiYoutubeText
        nodeKey={this.getKey()}
        placeholder={this.__placeholder}
      />
    );
  }
}

export function $createNiwiYoutubeText({
  placeholder,
}: NiwiYoutubeTextPropsType): NiwiYoutubeTextNode {
  return new NiwiYoutubeTextNode(placeholder);
}

export function $isNiwiYoutubeText(
  node: LexicalNode | null | undefined
): node is NiwiYoutubeTextNode {
  return node instanceof NiwiYoutubeTextNode;
}
