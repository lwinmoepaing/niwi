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
            const niwiYoutubeTextNode = $createNiwiYoutubeText(props);

            if ($isRangeSelection(selection)) {
              const { anchor } = selection;
              const anchorNode = anchor.getNode();
              const rootNode = $getRoot();

              if ($isRootNode(anchorNode)) {
                const firstChild = rootNode.getFirstChild();
                if (firstChild) {
                  firstChild.insertBefore(niwiYoutubeTextNode);
                } else {
                  rootNode.append(niwiYoutubeTextNode);
                }
                niwiYoutubeTextNode.selectEnd();
                return;
              }

              anchorNode.replace(niwiYoutubeTextNode);
              niwiYoutubeTextNode.selectEnd();
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
