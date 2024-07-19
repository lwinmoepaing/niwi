"use client";

import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { EditorState, LexicalEditor } from "lexical";
import { memo, useCallback, useMemo } from "react";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Editor Configuration
import editorConfig from "./config/editor-config";

// Custom Plugin
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin/CodeHighlightPlugin";
import NiwiEmojiPickerPlugin from "./plugins/NiwiEmojiPickerPlugin/NiwiEmojiPickerPlugin";
import NiwiEmojiPlugin from "./plugins/NiwiEmojiPlugin/NiwiEmojiPlugin";
import NiwiFloatingLeftSidePlugin from "./plugins/NiwiFloatingLeftSidePlugin/NiwiFloatingLeftSidePlugin";
import NiwiFloatingToolBarPlugin from "./plugins/NiwiFloatingToolBarPlugin/NiwiFloatingToolBarPlugin";
import NiwiImagePlugin from "./plugins/NiwiImagePlugin/NiwiImagePlugin";
import NiwiInitializeHtmlPlugin from "./plugins/NiwiInitializeHtmlPlugin/NiwiInitializeHtmlPlugin";
import NiwiLineBreakPlugin from "./plugins/NiwiLineBreakPlugin/NiwiLineBreakPlugin";
import NiwiSplashImagePlugin from "./plugins/NiwiSplashImagePlugin/NiwiSplashImagePlugin";
import NiwiTwitterPlugin from "./plugins/NiwiTwitterPlugin/NiwiTwitterPlugin";
import NiwiYoutubePlugin from "./plugins/NiwiYoutubePlugin/NiwiYoutubePlugin";

const placeholderText = "Enter your blog";

type NiwiTextEditorProps = {
  initializeData?: string;
  onChangeValue?: (html: string, json: string) => void;
};

function NiwiTextEditor({
  onChangeValue,
  initializeData = "",
}: NiwiTextEditorProps) {
  const onChangeHandler = useCallback(
    (_editorState: EditorState, editor: LexicalEditor) => {
      if (!onChangeValue) return;

      const editorState = editor.getEditorState();
      const json = editorState.toJSON();

      editorState.read(() => {
        const htmlValue = $generateHtmlFromNodes(editor);
        onChangeValue(htmlValue, JSON.stringify(json));
      });
    },
    []
  );

  const placeholder = useMemo(
    () => (
      <div className="editor-placeholder">
        {initializeData ? "" : placeholderText}
      </div>
    ),
    [initializeData]
  );

  const contentEditable = useMemo(
    () => (
      <ContentEditable
        className="editor-input"
        aria-placeholder={placeholderText}
        placeholder={placeholderText}
      />
    ),
    []
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {/* Editor Actions */}
        <NiwiFloatingToolBarPlugin />
        <NiwiFloatingLeftSidePlugin />

        <div className="editor-inner">
          <RichTextPlugin
            placeholder={placeholder}
            contentEditable={contentEditable}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChangeHandler} />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <CodeHighlightPlugin />

          {/* Custom Plugins */}
          <NiwiEmojiPlugin />
          <NiwiEmojiPickerPlugin />
          <NiwiImagePlugin />
          <NiwiYoutubePlugin />
          <NiwiSplashImagePlugin />
          <NiwiTwitterPlugin />
          <NiwiLineBreakPlugin />

          {/* Initializing Data */}
          {!!initializeData && (
            <NiwiInitializeHtmlPlugin contentJson={initializeData} />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}

export default memo(NiwiTextEditor);
