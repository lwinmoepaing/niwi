"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import LineBreakIcon from "../../../editor-icons/linebreak-icon";
import { INSERT_NIWI_LINE_BREAK_COMMAND } from "../NiwiLineBreakPlugin";

type NiwiLineBreakInsertIconProps = {
  onClick?: () => void;
};

function NiwiLineBreakInsertIcon({ onClick }: NiwiLineBreakInsertIconProps) {
  const [editor] = useLexicalComposerContext();

  const onInsertTwitterLink = useCallback(() => {
    onClick?.();
    editor.dispatchCommand(INSERT_NIWI_LINE_BREAK_COMMAND, undefined);
  }, []);

  return (
    <>
      <button
        onClick={onInsertTwitterLink}
        className="editor-side-right-actions-button"
        type="button"
      >
        <LineBreakIcon className="w-[30px] h-[30px]" />
      </button>
    </>
  );
}
export default NiwiLineBreakInsertIcon;
