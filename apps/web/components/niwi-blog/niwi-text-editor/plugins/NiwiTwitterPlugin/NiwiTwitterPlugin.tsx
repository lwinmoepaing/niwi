import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
import { useEffect } from "react";

import { NiwiTwitterNode } from "./nodes/NiwiTwitterNode";
import {
  $createNiwiTwitterText,
  NiwiTwitterTextNode,
  NiwiTwitterTextPropsType,
} from "./nodes/NiwiTwitterTextNode";

export const INSERT_NIWI_TWITTER_COMMAND =
  createCommand<NiwiTwitterTextPropsType>("insert-niwi-twitter-command");

export default function NiwiTwitterPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NiwiTwitterTextNode, NiwiTwitterNode])) {
      throw new Error(
        "NiwiTwitterPlugin: NiwiTwitterTextNode or NiwiTwitterNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_NIWI_TWITTER_COMMAND,
        (props: NiwiTwitterTextPropsType) => {
          editor.update(() => {
            const selection = $getSelection();
            const niwiTwitterTextNode = $createNiwiTwitterText(props);

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              anchor.getNode().insertBefore(niwiTwitterTextNode);
              if (selection) {
                const currentNode = selection.getNodes()[0];
                currentNode?.remove();
              }
              niwiTwitterTextNode.selectEnd();
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
