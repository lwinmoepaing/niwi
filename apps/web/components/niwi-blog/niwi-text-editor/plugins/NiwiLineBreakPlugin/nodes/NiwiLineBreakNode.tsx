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
import NiwiLineBreak from "../components/NiwiLineBreak";

export type NiwiLineBreakNodePropsType = {};

type SerializedNiwiLineBreakNode = Spread<
  NiwiLineBreakNodePropsType,
  SerializedLexicalNode
>;

export const NIWI_LINE_BREAK_PLUGIN_TYPE = "Niwi-LineBreak";

const ATTR = {
  container: "data-editor-niwi-line-break-container",
};

const KLASS = {
  container: "niwi-editor-niwi-line-break-container",
};

export function convertNiwiImage(): DOMConversionOutput | null {
  const node = $createNiwiLineBreakNode();
  return {
    node,
  };
}

export class NiwiLineBreakNode extends DecoratorNode<JSX.Element> {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return NIWI_LINE_BREAK_PLUGIN_TYPE;
  }

  static clone(node: NiwiLineBreakNode): NiwiLineBreakNode {
    return new NiwiLineBreakNode(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement("div");
    dom.classList.add(KLASS.container);

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
          conversion: convertNiwiImage,
          priority: 1,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.classList.add(KLASS.container);
    element.setAttribute(ATTR.container, "true");

    const lbContainer = document.createElement("div");
    lbContainer.classList.add("niwi-line-break");

    const dotContainer = document.createElement("div");
    dotContainer.classList.add("dot-container");

    const dot = document.createElement("span");
    dot.classList.add("dot");

    dotContainer.append(dot);
    dotContainer.append(dot);
    dotContainer.append(dot);

    lbContainer.append(dotContainer);
    element.append(lbContainer);
    return { element };
  }

  static importJSON(): NiwiLineBreakNode {
    const node = $createNiwiLineBreakNode();
    return node;
  }

  override exportJSON(): SerializedNiwiLineBreakNode {
    return {
      type: NIWI_LINE_BREAK_PLUGIN_TYPE,
      version: 1,
    };
  }

  decorate(): JSX.Element {
    return <NiwiLineBreak nodeKey={this.__key} />;
  }
}

export function $createNiwiLineBreakNode(): NiwiLineBreakNode {
  return new NiwiLineBreakNode();
}

export function $isNiwiLineBreakNode(
  node: LexicalNode | null | undefined
): node is NiwiLineBreakNode {
  return node instanceof NiwiLineBreakNode;
}
