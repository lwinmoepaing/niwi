"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

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
            placeholder={null}
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={placeholder}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          {/* Custom Plugins */}
        </div>
      </div>
    </LexicalComposer>
  );
}
