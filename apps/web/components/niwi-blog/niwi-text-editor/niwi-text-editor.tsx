"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Editor Configuration
import editorConfig from "./config/editor-config";

// Custom Plugin
import NiwiFloatingLeftSidePlugin from "./plugins/NiwiFloatingLeftSidePlugin/NiwiFloatingLeftSidePlugin";
import NiwiFloatingToolBarPlugin from "./plugins/NiwiFloatingToolBarPlugin/NiwiFloatingToolBarPlugin";
import NiwiEmojiPlugin from "./plugins/NiwiEmojiPlugin/NiwiEmojiPlugin";
import NiwiEmojiPickerPlugin from "./plugins/NiwiEmojiPickerPlugin/NiwiEmojiPickerPlugin";
import NiwiImagePlugin from "./plugins/NiwiImagePlugin/NiwiImagePlugin";

const placeholder = "Enter your blog";

export default function NiwiTextEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {/* Editor Actions */}
        <NiwiFloatingToolBarPlugin />
        <NiwiFloatingLeftSidePlugin />

        <div className="editor-inner">
          <RichTextPlugin
            placeholder={
              <div className="editor-placeholder">{placeholder}</div>
            }
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={placeholder}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              editor.getEditorState().read(() => {
                console.log($generateHtmlFromNodes(editor));
              });
            }}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />

          {/* Custom Plugins */}
          <NiwiEmojiPlugin />
          <NiwiEmojiPickerPlugin />
          <NiwiImagePlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
