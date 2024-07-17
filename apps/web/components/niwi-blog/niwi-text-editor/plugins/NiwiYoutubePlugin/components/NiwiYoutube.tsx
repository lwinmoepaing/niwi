import type { ElementFormatType, NodeKey } from "lexical";

import { cn } from "@/libs/utils";
import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";
import { Trash2 } from "lucide-react";
import { memo, useEffect, useMemo } from "react";
import {
  useEditorKeydown,
  useNodeActive,
  useNodeFocus,
  useRemoveNode,
} from "../../../editor-utils/editor-keydown-paragraph";

type NiwiYoutubeProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  videoID: string;
}>;

function NiwiYoutube({
  className,
  format,
  nodeKey,
  videoID,
}: NiwiYoutubeProps) {
  const { isFocus } = useNodeFocus({ nodeKey });
  const { isActive, ref } = useNodeActive<HTMLDivElement>({});
  const { escapeWithParagraph } = useEditorKeydown({ nodeKey });
  const { removeNodeAndReplaceParagraph } = useRemoveNode({ nodeKey });

  const isActiveVideo = useMemo(() => isActive || isFocus, [isActive, isFocus]);

  useEffect(() => {
    if (!isActiveVideo) {
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
  }, [isActiveVideo]);

  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      <div className="youtube-wrapper" ref={ref}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoID}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          title="YouTube video"
        />
      </div>
      <div className={cn("niwi-embedded-tooltip")}>
        <button
          type="button"
          className="icon-wrapper"
          onClick={removeNodeAndReplaceParagraph}
        >
          <Trash2 className={cn("icon")} />
        </button>
      </div>
    </BlockWithAlignableContents>
  );
}

export default memo(NiwiYoutube);
