import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import {
  $createNiwiSplashImageNode,
  NiwiSplashImageNode,
} from "./nodes/NiwiSplashImageNode";

export const INSERT_NIWI_SPLASH_IMAGE_COMMAND = createCommand(
  "insert-niwi-splash-image-command"
);

export default function NiwiSplashImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NiwiSplashImageNode])) {
      throw new Error(
        "NiwiSplashImagePlugin: NiwiSplashImageNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_NIWI_SPLASH_IMAGE_COMMAND,
        () => {
          editor.update(() => {
            const selection = $getSelection();
            const NiwiSplashImageNode = $createNiwiSplashImageNode();

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              anchor.getNode().insertBefore(NiwiSplashImageNode);
              if (selection) {
                const currentNode = selection.getNodes()[0];
                currentNode?.remove();
              }
              NiwiSplashImageNode.selectEnd();
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
