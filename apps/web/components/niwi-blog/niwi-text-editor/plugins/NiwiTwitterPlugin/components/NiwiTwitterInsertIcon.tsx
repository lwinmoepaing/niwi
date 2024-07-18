"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import TwitterLogo from "../../../editor-icons/twitter-logo";
import { INSERT_NIWI_TWITTER_COMMAND } from "../NiwiTwitterPlugin";

type NiwiTwitterInsertIconProps = {
  onClick?: () => void;
};

function NiwiTwitterInsertIcon({ onClick }: NiwiTwitterInsertIconProps) {
  const [editor] = useLexicalComposerContext();

  const onInsertTwitterLink = useCallback(() => {
    onClick?.();
    editor.dispatchCommand(INSERT_NIWI_TWITTER_COMMAND, {
      placeholder: "Copy and paste twitter(x.com) url...",
    });
  }, []);

  return (
    <>
      <button
        onClick={onInsertTwitterLink}
        className="editor-side-right-actions-button"
        type="button"
      >
        <TwitterLogo className="w-[14px] h-[14px]" />
      </button>
    </>
  );
}
export default NiwiTwitterInsertIcon;
