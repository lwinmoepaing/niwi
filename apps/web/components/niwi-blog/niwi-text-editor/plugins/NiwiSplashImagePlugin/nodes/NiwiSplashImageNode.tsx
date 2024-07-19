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
import NiwiEditorSplashImage from "../components/NiwiEditorSplashImage";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NiwiSplashImageNodePropsType = {};

type SerializedNiwiSplashImageNode = Spread<
  NiwiSplashImageNodePropsType,
  SerializedLexicalNode
>;

export const INLINE_NIWI_SPLASH_IMAGE_PLUGIN_TYPE = "Niwi-Splash-Image";

const ATTR = {
  container: "data-editor-niwi-splash-image-container",
};

const KLASS = {
  container: "niwi-editor-spash-image-container",
};

export function convertNiwiSplashImage(): DOMConversionOutput | null {
  const node = $createNiwiSplashImageNode();
  return {
    node,
  };
}

export class NiwiSplashImageNode extends DecoratorNode<JSX.Element> {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return INLINE_NIWI_SPLASH_IMAGE_PLUGIN_TYPE;
  }

  static clone(node: NiwiSplashImageNode): NiwiSplashImageNode {
    return new NiwiSplashImageNode(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.setAttribute(ATTR.container, "true");
    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap<HTMLDivElement> | null {
    return {
      div: (domNode: HTMLDivElement) => {
        if (!domNode.hasAttribute(ATTR.container)) {
          return null;
        }

        return {
          conversion: convertNiwiSplashImage,
          priority: 1,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.classList.add(KLASS.container);
    element.setAttribute(ATTR.container, "true");
    return { element };
  }

  static importJSON(): NiwiSplashImageNode {
    const node = $createNiwiSplashImageNode();
    return node;
  }

  override exportJSON(): SerializedNiwiSplashImageNode {
    return {
      type: INLINE_NIWI_SPLASH_IMAGE_PLUGIN_TYPE,
      version: 1,
    };
  }

  decorate(): JSX.Element {
    return <NiwiEditorSplashImage nodeKey={this.getKey()} />;
  }
}

export function $createNiwiSplashImageNode(): NiwiSplashImageNode {
  return new NiwiSplashImageNode();
}

export function $isNiwiSplashImageNode(
  node: LexicalNode | null | undefined
): node is NiwiSplashImageNode {
  return node instanceof NiwiSplashImageNode;
}
