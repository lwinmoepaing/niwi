type TextNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: "text";
  version: number;
};

type LinkNode = {
  children: TextNode[];
  direction: string;
  format: string;
  indent: number;
  type: "link";
  version: number;
  rel: string;
  target: null | string;
  title: null | string;
  url: string;
};

type ListItemNode = {
  children: (TextNode | LinkNode)[];
  direction: string;
  format: string;
  indent: number;
  type: "listitem";
  version: number;
  value: number;
};

type ListNode = {
  children: ListItemNode[];
  direction: string;
  format: string;
  indent: number;
  type: "list";
  version: number;
  listType: string;
  start: number;
  tag: string;
};

type Node = TextNode | LinkNode | ListItemNode | ListNode;

export function getTextNodes(node: Node): TextNode[] {
  let textNodes: TextNode[] = [];

  if (node.type === "text") {
    textNodes.push(node);
  } else if (node.children) {
    for (const child of node.children) {
      textNodes = textNodes.concat(getTextNodes(child));
    }
  }

  return textNodes;
}

export function getPlainTextFromNode(node: Node): string {
  const textNodes = getTextNodes(node);
  const concatenatedText = textNodes.map((textNode) => textNode.text).join("");
  return concatenatedText;
}
