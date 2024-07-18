import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import niwiEditorTheme from "../theme/niwi-editor-theme";

// Custom Nodes
import { NiwiEmojiNode } from "../plugins/NiwiEmojiPlugin/nodes/NiwiEmojiNode";
import { NiwiImageCaptionNode } from "../plugins/NiwiImagePlugin/nodes/NiwiImageCaptionNode";
import { NiwiImageNode } from "../plugins/NiwiImagePlugin/nodes/NiwiImageNode";
import { NiwiSplashImageNode } from "../plugins/NiwiSplashImagePlugin/nodes/NiwiSplashImageNode";
import { NiwiTwitterNode } from "../plugins/NiwiTwitterPlugin/nodes/NiwiTwitterNode";
import { NiwiTwitterTextNode } from "../plugins/NiwiTwitterPlugin/nodes/NiwiTwitterTextNode";
import { NiwiYoutubeNode } from "../plugins/NiwiYoutubePlugin/nodes/NiwiYoutubeNode";
import { NiwiYoutubeTextNode } from "../plugins/NiwiYoutubePlugin/nodes/NiwiYoutubeTextNode";

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

    // ----------------------- //
    // -- My CustomNodes       //
    // ----------------------- //
    // ----------
    // - Emojis
    // ----------
    NiwiEmojiNode,
    // ----------
    // - Images
    // ----------
    NiwiImageNode,
    NiwiImageCaptionNode,
    // ----------
    // - Youtube
    // ----------
    NiwiYoutubeTextNode,
    NiwiYoutubeNode,
    // ----------
    // - Splash Image
    // ----------
    NiwiSplashImageNode,
    // ----------
    // - Twitter
    // ----------
    NiwiTwitterTextNode,
    NiwiTwitterNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export default editorConfig;
