import { cn } from "@/libs/utils";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import {
  useEditorKeydown,
  useNodeActive,
  useNodeFocus,
  useRemoveNode,
} from "../../../editor-utils/editor-keydown-paragraph";

function NiwiLineBreak({ nodeKey }: { nodeKey: string }) {
  const { isFocus } = useNodeFocus({ nodeKey });
  const { ref, isActive, setIsActive } = useNodeActive<HTMLDivElement>({});
  const { escapeWithParagraph } = useEditorKeydown({ nodeKey });
  const { removeNodeAndReplaceParagraph } = useRemoveNode({ nodeKey });

  const isActiveLineBreak = useMemo(
    () => isFocus || isActive,
    [isActive, isFocus]
  );

  useEffect(() => {
    if (!isActiveLineBreak) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          escapeWithParagraph("up");
          return;
        case "ArrowDown":
          escapeWithParagraph("down");
          return;
        case "ArrowLeft":
          escapeWithParagraph("up");
          return;
        case "ArrowRight":
          escapeWithParagraph("down");
          return;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isActiveLineBreak]);

  return (
    <div
      ref={ref}
      onClick={() => {
        setIsActive(true);
      }}
      className={cn("niwi-line-break", isActive && "active")}
    >
      <div className="dot-container">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className={cn("niwi-linebreak-tooltip")}>
        <button
          type="button"
          className="icon-wrapper"
          onClick={removeNodeAndReplaceParagraph}
        >
          <Trash2 className={cn("icon")} />
        </button>
      </div>
    </div>
  );
}
export default NiwiLineBreak;
