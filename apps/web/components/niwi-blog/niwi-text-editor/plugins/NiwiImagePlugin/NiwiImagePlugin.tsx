import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { COMMAND_PRIORITY_LOW, createCommand } from "lexical";
import { useEffect } from "react";

import { $insertNodeToNearestRoot } from "@lexical/utils";

import {
  $createNiwiImageNode,
  NiwiImageNode,
  NiwiImageNodePropsType,
} from "./nodes/NiwiImageNode";

export const INSERT_NIWI_IMAGE_COMMAND =
  createCommand<NiwiImageNodePropsType>();

export default function NiwiImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NiwiImageNode])) {
      throw new Error(
        "NiwiImagePlugin: NiwiImageNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_NIWI_IMAGE_COMMAND,
        (props: NiwiImageNodePropsType) => {
          editor.update(() => {
            const NiwiImageNode = $createNiwiImageNode(props);
            $insertNodeToNearestRoot(NiwiImageNode);
          });
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
