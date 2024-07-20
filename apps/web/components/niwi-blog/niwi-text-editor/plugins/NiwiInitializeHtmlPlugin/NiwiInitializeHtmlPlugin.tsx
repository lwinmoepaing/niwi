import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { memo, useCallback, useEffect } from "react";

function NiwiInitializeHtmlPlugin({ contentJson }: { contentJson: string }) {
  const [editor] = useLexicalComposerContext();

  const importJson = useCallback(
    (contentJson: string) => {
      const data = editor.parseEditorState(contentJson);
      queueMicrotask(() => {
        editor.setEditorState(data);
      });
    },
    [editor]
  );

  useEffect(() => {
    importJson(contentJson);
  }, [importJson]);

  return null;
}
export default memo(NiwiInitializeHtmlPlugin);
