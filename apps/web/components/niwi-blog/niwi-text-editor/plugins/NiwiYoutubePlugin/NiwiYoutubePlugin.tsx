import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
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
            const NiwiYoutubeTextNode = $createNiwiYoutubeText(props);

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              anchor.getNode().insertBefore(NiwiYoutubeTextNode);
              if (selection) {
                const currentNode = selection.getNodes()[0];
                currentNode?.remove();
              }
              NiwiYoutubeTextNode.selectEnd();
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
