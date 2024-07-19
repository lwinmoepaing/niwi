import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootNode,
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
            const niwiSplashImageNode = $createNiwiSplashImageNode();

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              const anchorNode = anchor.getNode();
              const rootNode = $getRoot();

              if ($isRootNode(anchorNode)) {
                const firstChild = rootNode.getFirstChild();
                if (firstChild) {
                  firstChild.insertBefore(niwiSplashImageNode);
                } else {
                  rootNode.append(niwiSplashImageNode);
                }
                niwiSplashImageNode.selectEnd();
                return;
              }

              anchorNode.replace(niwiSplashImageNode);
              niwiSplashImageNode.selectEnd();
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
