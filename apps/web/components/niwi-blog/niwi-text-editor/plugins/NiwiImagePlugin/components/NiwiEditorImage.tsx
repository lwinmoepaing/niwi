import { cn } from "@/libs/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Image from "next/image";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ImageExtraWidthIcon from "../../../editor-icons/image-extra-width-icon";
import ImageFitViewIcon from "../../../editor-icons/image-fit-view-icon";
import {
  useEditorKeydown,
  useNodeActive,
  useNodeFocus,
  useRemoveNode,
} from "../../../editor-utils/editor-keydown-paragraph";
import { NiwiImageNodePropsType } from "../nodes/NiwiImageNode";
import { Trash2 } from "lucide-react";

type NiwiEditorImageProps = {
  src: string;
  imgSize: NiwiImageNodePropsType["imgSize"];
  nodeKey: string;
  // eslint-disable-next-line no-unused-vars
  updatePlaceHolder: (_str: string) => void;
};

const NiwiEditorImage = ({
  src,
  imgSize,
  nodeKey,
  updatePlaceHolder,
}: NiwiEditorImageProps) => {
  const captionRef = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();

  const [placeHolder, setPlaceHolder] = useState<string>("");
  const [imageSize, setImageSize] =
    useState<NiwiImageNodePropsType["imgSize"]>(imgSize);

  const { isFocus } = useNodeFocus({ nodeKey });
  const { ref, isActive, setIsActive } = useNodeActive<HTMLDivElement>();
  const { escapeWithParagraph } = useEditorKeydown({ nodeKey });
  const { removeNodeAndReplaceParagraph } = useRemoveNode({ nodeKey });

  const isExistImage = useMemo<boolean>(() => {
    return !!src;
  }, [src]);

  useEffect(() => {
    captionRef?.current?.focus();
  }, [isFocus]);

  const handleKeyDownCaption = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.isPropagationStopped();
      switch (event.key) {
        case "ArrowUp":
          captionRef?.current?.blur();
          escapeWithParagraph("up");
          return;
        case "ArrowDown":
          captionRef?.current?.blur();
          escapeWithParagraph("down");
          return;
        case "Enter":
          captionRef?.current?.blur();
          escapeWithParagraph("down");
          return;
      }
    },
    [captionRef]
  );

  const handlCaption = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlaceHolder(e.target.value);
    editor.update(() => {
      updatePlaceHolder(e.target.value);
    });
  }, []);

  const isActiveImage = useMemo(() => isActive || isFocus, [isActive, isFocus]);

  return (
    <>
      {isExistImage && (
        <div
          className={cn(imageSize, "image-wrapper")}
          onClick={() => {
            setIsActive(true);
            captionRef?.current?.focus();
          }}
          ref={ref}
        >
          <div className={cn("niwi-image-tooltip", isActiveImage && "active")}>
            <button
              type="button"
              className="icon-wrapper"
              onClick={() => setImageSize("fitWidth")}
            >
              <ImageFitViewIcon
                className={cn("icon", imageSize === "fitWidth" && "active")}
              />
            </button>
            <button
              type="button"
              className="icon-wrapper"
              onClick={() => setImageSize("extraWidth")}
            >
              <ImageExtraWidthIcon
                className={cn("icon", imageSize === "extraWidth" && "active")}
              />
            </button>
            <button
              type="button"
              className="icon-wrapper trash"
              onClick={removeNodeAndReplaceParagraph}
            >
              <Trash2 />
            </button>
          </div>
          <Image
            className={cn(imageSize, "niwi-image", isActiveImage && "active")}
            src={src || ""}
            alt={""}
            width={800}
            height={600}
          />
        </div>
      )}
      <input
        ref={captionRef}
        className="niwi-editor-image-caption"
        placeholder="Enter Caption"
        onChange={handlCaption}
        onKeyDown={handleKeyDownCaption}
        value={placeHolder}
      />
    </>
  );
};
export default memo(NiwiEditorImage);
