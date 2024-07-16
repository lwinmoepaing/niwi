import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import niwiEditorTheme from "../theme/niwi-editor-theme";

// Custom Nodes
import { NiwiEmojiNode } from "../plugins/NiwiEmojiPlugin/nodes/NiwiEmojiNode";
import { NiwiImageNode } from "../plugins/NiwiImagePlugin/nodes/NiwiImageNode";
import { NiwiImageCaptionNode } from "../plugins/NiwiImagePlugin/nodes/NiwiImageCaptionNode";

const editorConfig: InitialConfigType = {
  theme: niwiEditorTheme,
  namespace: "Niwi Blog Editor",
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    AutoLinkNode,
    LinkNode,
    CodeNode,
    CodeHighlightNode,

    // -----------------------
    // -- My CustomNodes
    // -----------------------
    // - Emojis
    // -
    NiwiEmojiNode,
    // - Images
    // -
    NiwiImageNode,
    NiwiImageCaptionNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export default editorConfig;
