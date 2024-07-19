import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { memo, useCallback, useEffect } from "react";

// const importJson = (editor: LexicalEditor, contentJson: string) => {
//   const parser = new DOMParser();
//   const dom = parser.parseFromString(contentJson, "text/html");
//   const nodes = $generateNodesFromDOM(editor, dom);
//   const root = $getRoot();
//   root.clear();
//   root.select();
//   $insertNodes(nodes);
// };

function NiwiInitializeHtmlPlugin({ contentJson }: { contentJson: string }) {
  const [editor] = useLexicalComposerContext();

  const importJson = useCallback(
    (contentJson: string) => {
      const data = editor.parseEditorState(contentJson);
      editor.setEditorState(data);
    },
    [editor]
  );

  useEffect(() => {
    importJson(contentJson);
  }, [importJson]);

  return null;
}
export default memo(NiwiInitializeHtmlPlugin);
