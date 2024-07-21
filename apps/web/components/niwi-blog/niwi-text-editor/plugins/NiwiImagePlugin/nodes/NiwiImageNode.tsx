import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import NiwiEditorImage from "../components/NiwiEditorImage";

export type ImageSizeType = "contain" | "fitWidth" | "extraWidth" | "fullScreen";

export type NiwiImageNodePropsType = {
  imgSize: ImageSizeType;
  src: string;
  altText: string;
};

type SerializedNiwiImageNode = Spread<
  NiwiImageNodePropsType,
  SerializedLexicalNode
>;

export const INLINE_IMAGE_PLUGIN_TYPE = "Niwi-Image-Container";

const ATTR = {
  container: "data-editor-niwi-image-container",
  src: "data-editor-niwi-image-src",
  size: "data-editor-niwi-image-size",
  altText: "data-editor-niwi-image-alttext",
};

const KLASS = {
  container: "niwi-editor-image-container",
};

export const $getDataFromNiwiImageDom = (
  domNode: HTMLDivElement
): NiwiImageNodePropsType => {
  const src = (domNode.getAttribute(ATTR.src) || "") as string;
  const size = (domNode.getAttribute(ATTR.size) || "contain") as ImageSizeType;
  const altText = (domNode.getAttribute(ATTR.altText) || "") as string;

  return {
    src: src,
    imgSize: size,
    altText: altText,
  };
};

export function convertNiwiImage(
  domNode: HTMLDivElement
): DOMConversionOutput | null {
  const data = $getDataFromNiwiImageDom(domNode);
  const node = $createNiwiImageNode(data);
  return {
    node,
  };
}

export class NiwiImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __imgSize: ImageSizeType;

  constructor(
    src: string,
    size: ImageSizeType,
    altText: string,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__imgSize = size;
    this.__altText = altText;
  }

  static getType(): string {
    return INLINE_IMAGE_PLUGIN_TYPE;
  }

  static clone(node: NiwiImageNode): NiwiImageNode {
    return new NiwiImageNode(
      node.__src,
      node.__imgSize,
      node.__altText,
      node.__key
    );
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.classList.add(KLASS.container);
    dom.classList.add(`size-${this.__imgSize}`);
    dom.setAttribute(ATTR.container, "true");
    dom.setAttribute(ATTR.src, this.__src || "");
    dom.setAttribute(ATTR.size, this.__imgSize);
    dom.setAttribute(ATTR.altText, this.__altText || "");
    return dom;
  }

  updateDOM(prevNode: NiwiImageNode, dom: HTMLDivElement): boolean {
    if (prevNode.__imgSize !== this.__imgSize) {
      dom.classList.remove(`size-${prevNode.__imgSize}`);
      dom.classList.add(`size-${this.__imgSize}`);
      dom.setAttribute(ATTR.size, this.__imgSize);
    }

    if (prevNode.__src !== this.__src) {
      dom.setAttribute(ATTR.src, this.__src);
    }

    if (prevNode.__altText !== this.__altText) {
      dom.setAttribute(ATTR.altText, this.__altText);
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
          priority: 2,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.classList.add(KLASS.container);
    element.setAttribute(ATTR.container, "true");
    element.setAttribute(ATTR.src, this.__src);
    element.setAttribute(ATTR.size, this.__imgSize);
    element.setAttribute(ATTR.altText, this.__altText);
    element.classList.add(`size-${this.__imgSize}`);

    // Image
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-wrapper");
    imgContainer.classList.add(this.__imgSize);

    const img = document.createElement("img");
    img.classList.add("niwi-image");
    img.classList.add(this.__imgSize);
    img.setAttribute("src", this.__src);
    img.setAttribute("alt", this.__altText);

    // Collect all from container
    imgContainer.append(img);
    element.appendChild(imgContainer);

    // Image Caption
    const p = document.createElement("p");
    p.classList.add("niwi-editor-image-caption");
    p.innerHTML = this.__altText || "";
    element.appendChild(p);

    return { element };
  }

  static importJSON(serializedNode: SerializedNiwiImageNode): NiwiImageNode {
    const node = $createNiwiImageNode({
      ...serializedNode,
    });
    return node;
  }

  override exportJSON(): SerializedNiwiImageNode {
    return {
      type: INLINE_IMAGE_PLUGIN_TYPE,
      ...this.getData(),
      version: 1,
    };
  }

  getSize(): ImageSizeType {
    return this.getLatest().__imgSize;
  }

  setSize(size: ImageSizeType): void {
    const writable = this.getWritable();
    writable.__imgSize = size;
  }

  getAltText(): string {
    return this.getLatest().__altText;
  }

  setAltText(value: string): void {
    const writable = this.getWritable();
    writable.__altText = value;
  }

  getData(): NiwiImageNodePropsType {
    const latestData = this.getLatest();
    return {
      src: latestData.__src,
      imgSize: latestData.__imgSize,
      altText: latestData.__altText,
    };
  }

  updateData(data: NiwiImageNodePropsType) {
    const writable = this.getWritable();
    writable.__imgSize = data.imgSize;
    writable.__src = data.src;
    writable.__altText = data.altText;
  }

  decorate(): JSX.Element {
    return (
      <NiwiEditorImage
        nodeKey={this.getKey()}
        src={this.__src}
        imgSize={this.__imgSize}
        altText={this.__altText}
        updatePlaceHolder={(str) => this.setAltText(str)}
        updateImageSize={(str: ImageSizeType) => this.setSize(str)}
      />
    );
  }
}

export function $createNiwiImageNode({
  src,
  imgSize,
  altText,
}: NiwiImageNodePropsType): NiwiImageNode {
  return new NiwiImageNode(src, imgSize, altText);
}

export function $isNiwiImageNode(
  node: LexicalNode | null | undefined
): node is NiwiImageNode {
  return node instanceof NiwiImageNode;
}
