"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Youtube } from "lucide-react";
import { useCallback } from "react";
import { INSERT_NIWI_YOUTUBE_COMMAND } from "../NiwiYoutubePlugin";

type NiwiYoutubeInsertIconProps = {
  onClick?: () => void
}

function NiwiYoutubeInsertIcon({onClick}: NiwiYoutubeInsertIconProps) {
  const [editor] = useLexicalComposerContext();

  const onInsertYoutubeLink = useCallback(() => {
    onClick?.();
    editor.dispatchCommand(INSERT_NIWI_YOUTUBE_COMMAND, {
      placeholder: "Copy and paste youtube url...",
    });
  }, []);

  return (
    <>
      <button
        onClick={onInsertYoutubeLink}
        className="editor-side-right-actions-button"
        type="button"
      >
        <Youtube size={20} />
      </button>
    </>
  );
}
export default NiwiYoutubeInsertIcon;
