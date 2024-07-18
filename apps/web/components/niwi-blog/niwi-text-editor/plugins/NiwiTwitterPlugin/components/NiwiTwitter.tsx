import type { ElementFormatType, NodeKey } from "lexical";

import { cn } from "@/libs/utils";
import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";
import { CircleDashed, Trash2 } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useEditorKeydown,
  useNodeActive,
  useNodeFocus,
  useRemoveNode,
} from "../../../editor-utils/editor-keydown-paragraph";

type NiwiTwitterProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  tweetID: string;
  loadingComponent?: JSX.Element | string;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: string) => void;
  onLoad?: () => void;
}>;

let isTwitterScriptLoading = true;
const WIDGET_SCRIPT_URL = "https://platform.twitter.com/widgets.js";

function NiwiTwitter({
  className,
  format,
  nodeKey,
  tweetID,
  onLoad,
  onError,
}: NiwiTwitterProps) {
  const { isFocus } = useNodeFocus({ nodeKey });
  const { isActive, ref } = useNodeActive<HTMLDivElement>({});
  const { escapeWithParagraph } = useEditorKeydown({ nodeKey });
  const { removeNodeAndReplaceParagraph } = useRemoveNode({ nodeKey });
  const previousTweetIDRef = useRef<string>("");
  const [isTweetLoading, setIsTweetLoading] = useState(false);

  const isActiveTweet = useMemo(() => isActive || isFocus, [isActive, isFocus]);

  const createTweet = useCallback(async () => {
    try {
      // @ts-expect-error Twitter is attached to the window.
      await window.twttr.widgets.createTweet(tweetID, ref.current);

      setIsTweetLoading(false);
      isTwitterScriptLoading = false;

      if (onLoad) {
        onLoad();
      }
    } catch (error) {
      if (onError) {
        onError(String(error));
      }
    }
  }, [onError, onLoad, tweetID]);

  useEffect(() => {
    if (tweetID !== previousTweetIDRef.current) {
      setIsTweetLoading(true);

      if (isTwitterScriptLoading) {
        const script = document.createElement("script");
        script.src = WIDGET_SCRIPT_URL;
        script.async = true;
        document.body?.appendChild(script);
        script.onload = createTweet;
        if (onError) {
          script.onerror = onError as OnErrorEventHandler;
        }
      } else {
        createTweet();
      }

      if (previousTweetIDRef) {
        previousTweetIDRef.current = tweetID;
      }
    }
  }, [createTweet, onError, tweetID]);

  useEffect(() => {
    if (!isActiveTweet) {
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
  }, [isActiveTweet]);

  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      {isTweetLoading ? (
        <CircleDashed className="animate-spin w-[20px] h-[20px]" />
      ) : null}
      <div className="twitter-wrapper" ref={ref}>
        <div className={cn("niwi-embedded-tooltip")}>
          <button
            type="button"
            className="icon-wrapper"
            onClick={removeNodeAndReplaceParagraph}
          >
            <Trash2 className={cn("icon")} />
          </button>
        </div>
      </div>
    </BlockWithAlignableContents>
  );
}

export default memo(NiwiTwitter);
