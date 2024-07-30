"use client";

import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, EditorState, LexicalEditor } from "lexical";
import { memo, useCallback, useEffect, useMemo } from "react";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Editor Configuration
import editorConfig from "./config/editor-config";

// Custom Plugin
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import NiwiEmojiPickerPlugin from "./plugins/NiwiEmojiPickerPlugin/NiwiEmojiPickerPlugin";
import NiwiEmojiPlugin from "./plugins/NiwiEmojiPlugin/NiwiEmojiPlugin";
import NiwiInitializeHtmlPlugin from "./plugins/NiwiInitializeHtmlPlugin/NiwiInitializeHtmlPlugin";

const placeholderText = "Enter your blog";

type NiwiTinyTextEditorProps = {
  initializeData?: string;
  placeHolder?: string;
  disabled: boolean;
  onChangeValue?: (html: string, json: string, plainText: string) => void;
};

const IsEditable = memo(({ disabled }: { disabled: boolean }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  return null;
});

function NiwiTinyTextEditor({
  onChangeValue,
  initializeData = "",
  disabled = false,
  placeHolder = placeholderText,
}: NiwiTinyTextEditorProps) {
  const onChangeHandler = useCallback(
    (_editorState: EditorState, editor: LexicalEditor) => {
      if (!onChangeValue) return;

      const editorState = editor.getEditorState();
      const json = editorState.toJSON();

      editorState.read(() => {
        const root = $getRoot();
        const rawPlainText = root.getTextContent();
        const plainText = rawPlainText
          .replace(/\n/g, " ")
          .split(" ")
          .filter(Boolean)
          .join(" ");
        const htmlValue = $generateHtmlFromNodes(editor);
        onChangeValue(htmlValue, JSON.stringify(json), plainText);
      });
    },
    [onChangeValue]
  );

  const placeholder = useMemo(
    () => (
      <div className="editor-placeholder">{placeHolder ? placeHolder : ""}</div>
    ),
    [placeHolder]
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
    <LexicalComposer initialConfig={{ ...editorConfig }}>
      <div className="editor-container tiny">
        {/* Editor Actions */}
        <div className="editor-inner">
          <IsEditable disabled={disabled} />
          <RichTextPlugin
            placeholder={placeholder}
            contentEditable={contentEditable}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChangeHandler} />
          <HistoryPlugin />

          {/* Custom Plugins */}
          <NiwiEmojiPlugin />
          <NiwiEmojiPickerPlugin />

          {/* Initializing Data */}
          {!!initializeData && (
            <NiwiInitializeHtmlPlugin contentJson={initializeData} />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}

export default memo(NiwiTinyTextEditor);
