import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot, mergeRegister } from "@lexical/utils";
import { $getSelection, COMMAND_PRIORITY_LOW, createCommand } from "lexical";
import { useEffect } from "react";

import { NiwiYoutubeNode } from "./nodes/NiwiYoutubeNode";
import {
  $createNiwiYoutubeText,
  NiwiYoutubeTextNode,
  NiwiYoutubeTextPropsType,
} from "./nodes/NiwiYoutubeTextNode";

export const INSERT_NIWI_YOUTUBE_COMMAND =
  createCommand<NiwiYoutubeTextPropsType>("insert-niwi-youtube-command");

export default function NiwiYoutubePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NiwiYoutubeTextNode, NiwiYoutubeNode])) {
      throw new Error(
        "NiwiYoutubePlugin: NiwiYoutubeTextNode or NiwiYoutubeNode is not registered on editor"
      );
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_NIWI_YOUTUBE_COMMAND,
        (props: NiwiYoutubeTextPropsType) => {
          editor.update(() => {
            const selection = $getSelection();
            const NiwiImageNode = $createNiwiYoutubeText(props);
            if (selection) {
              const currentNode = selection.getNodes()[0];
              currentNode?.remove();
            }
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
