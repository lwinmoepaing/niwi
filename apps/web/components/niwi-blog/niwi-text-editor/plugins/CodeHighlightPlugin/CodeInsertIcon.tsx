"use client";

import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Code } from "lucide-react";
import useNiwiToolBarAction from "../NiwiFloatingToolBarPlugin/hook/useNiwiToolBarAction";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";

function CodeInsertIcon() {
  const [editor] = useLexicalComposerContext();
  const { blockType } = useNiwiToolBarAction();

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();
        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };

  return (
    <>
      <button
        onClick={formatCode}
        className="editor-side-right-actions-button"
        type="button"
      >
        <Code size={20} />
      </button>
    </>
  );
}
export default CodeInsertIcon;
