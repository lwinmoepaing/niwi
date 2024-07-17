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
import NiwiYoutube from "../components/NiwiYoutube";

export type SerializedNiwiYoutubeNode = Spread<
  {
    videoID: string;
  },
  SerializedDecoratorBlockNode
>;

function $convertYoutubeElement(
  domNode: HTMLElement
): null | DOMConversionOutput {
  const videoID = domNode.getAttribute("data-lexical-youtube");
  if (videoID) {
    const node = $createNiwiYoutubeNode(videoID);
    return { node };
  }
  return null;
}

export class NiwiYoutubeNode extends DecoratorBlockNode {
  __id: string;

  static getType(): string {
    return "youtube";
  }

  static clone(node: NiwiYoutubeNode): NiwiYoutubeNode {
    return new NiwiYoutubeNode(node.__id, node.__format, node.__key);
  }

  static importJSON(
    serializedNode: SerializedNiwiYoutubeNode
  ): NiwiYoutubeNode {
    const node = $createNiwiYoutubeNode(serializedNode.videoID);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedNiwiYoutubeNode {
    return {
      ...super.exportJSON(),
      type: "youtube",
      version: 1,
      videoID: this.__id,
    };
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__id = id;
  }

  exportDOM(): DOMExportOutput {
    const container = document.createElement("div");
    container.setAttribute("data-lexical-youtube", this.__id);
    container.classList.add("niwi-youtube-container");

    const div = document.createElement("div");
    div.classList.add("youtube-wrapper");

    const element = document.createElement("iframe");
    element.setAttribute("data-lexical-youtube", this.__id);
    element.setAttribute("width", "100%");
    element.setAttribute("height", "100%");
    element.setAttribute(
      "src",
      `https://www.youtube-nocookie.com/embed/${this.__id}`
    );
    element.setAttribute("frameborder", "0");
    element.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    element.setAttribute("allowfullscreen", "true");
    element.setAttribute("title", "YouTube video");

    div.append(element);
    container.append(div);
    return { element: container };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-youtube")) {
          return null;
        }
        return {
          conversion: $convertYoutubeElement,
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
    return `https://www.youtube.com/watch?v=${this.__id}`;
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base:
        embedBlockTheme.base ||
        "niwi-youtube-container niwi-editor-embedded-container",
      focus: embedBlockTheme.focus || "",
    };
    return (
      <NiwiYoutube
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        videoID={this.__id}
      />
    );
  }
}

export function $createNiwiYoutubeNode(videoID: string): NiwiYoutubeNode {
  return new NiwiYoutubeNode(videoID);
}

export function $isNiwiYoutubeNode(
  node: NiwiYoutubeNode | LexicalNode | null | undefined
): node is NiwiYoutubeNode {
  return node instanceof NiwiYoutubeNode;
}
