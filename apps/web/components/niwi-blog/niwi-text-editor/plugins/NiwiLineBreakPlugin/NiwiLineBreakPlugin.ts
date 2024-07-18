import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import {
  $createNiwiLineBreakNode,
  NiwiLineBreakNode,
} from "./nodes/NiwiLineBreakNode";

export const INSERT_NIWI_LINE_BREAK_COMMAND = createCommand(
  "insert-niwi-line-break-command"
);

export default function NiwiLineBreakPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NiwiLineBreakNode])) {
      throw new Error(
        "NiwiLineBreakPlugin: NiwiLineBreakNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_NIWI_LINE_BREAK_COMMAND,
        () => {
          editor.update(() => {
            const selection = $getSelection();
            const niwiLineBreakNode = $createNiwiLineBreakNode();

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              anchor.getNode().insertBefore(niwiLineBreakNode);
              if (selection) {
                const currentNode = selection.getNodes()[0];
                currentNode?.remove();
              }
              niwiLineBreakNode.selectEnd();
              const p = $createParagraphNode();
              niwiLineBreakNode.insertAfter(p);
            }
          });
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
