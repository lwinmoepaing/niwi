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

import { NiwiImageCaptionNode } from "./nodes/NiwiImageCaptionNode";
import {
  $createNiwiImageNode,
  NiwiImageNode,
  NiwiImageNodePropsType,
} from "./nodes/NiwiImageNode";

export const INSERT_NIWI_IMAGE_COMMAND = createCommand<NiwiImageNodePropsType>(
  "insert-niwi-image-command"
);

export default function NiwiImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NiwiImageNode, NiwiImageCaptionNode])) {
      throw new Error(
        "NiwiImagePlugin: NiwiImageNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_NIWI_IMAGE_COMMAND,
        (props: NiwiImageNodePropsType) => {
          editor.update(() => {
            const selection = $getSelection();
            const niwiImageNode = $createNiwiImageNode(props);

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              const anchorNode = anchor.getNode();
              const rootNode = $getRoot();

              if ($isRootNode(anchorNode)) {
                const firstChild = rootNode.getFirstChild();
                if (firstChild) {
                  firstChild.insertBefore(niwiImageNode);
                } else {
                  rootNode.append(niwiImageNode);
                }
                niwiImageNode.selectEnd();
                return;
              }

              anchorNode.replace(niwiImageNode);
              niwiImageNode.selectEnd();
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
