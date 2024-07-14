import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import niwiEditorTheme from "../theme/niwi-editor-theme";

// Custom Nodes
import { NiwiEmojiNode } from "../plugins/NiwiEmojiPlugin/nodes/NiwiEmojiNode";

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

    // -- My CustomNodes
    //
    NiwiEmojiNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export default editorConfig;
