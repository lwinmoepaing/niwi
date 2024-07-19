import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootNode,
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
              const anchorNode = anchor.getNode();
              const rootNode = $getRoot();

              if ($isRootNode(anchorNode)) {
                const firstChild = rootNode.getFirstChild();
                if (firstChild) {
                  firstChild.insertBefore(niwiLineBreakNode);
                } else {
                  rootNode.append(niwiLineBreakNode);
                }
                const p = $createParagraphNode();
                niwiLineBreakNode.insertAfter(p);
                p.selectStart();
                return;
              }

              anchorNode.replace(niwiLineBreakNode);
              const p = $createParagraphNode();
              niwiLineBreakNode.insertAfter(p);
              p.selectStart();
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
