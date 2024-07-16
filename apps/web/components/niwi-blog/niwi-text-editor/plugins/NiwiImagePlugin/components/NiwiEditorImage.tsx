import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isNodeSelection, BaseSelection } from "lexical";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NiwiImageNodePropsType } from "../nodes/NiwiImageNode";
import { cn } from "@/libs/utils";
import ImageFitViewIcon from "../../../editor-icons/image-fit-view-icon";
import ImageExtraWidthIcon from "../../../editor-icons/image-extra-width-icon";
import ImageFullScreenIcon from "../../../editor-icons/image-full-screen-icon";

type NiwiEditorImageProps = {
  src: string;
  imgSize: NiwiImageNodePropsType["imgSize"];
  nodeKey: string;
};

const NiwiEditorImage = ({ src, imgSize, nodeKey }: NiwiEditorImageProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [imageSize, setImageSize] =
    useState<NiwiImageNodePropsType["imgSize"]>(imgSize);

  const onRightClick = useCallback(() => {
    // console.log("On Right Click");
  }, []);

  useEffect(() => {
    let isMounted = true;
    const rootElement = editor.getRootElement();

    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      })
    );

    rootElement?.addEventListener("contextmenu", onRightClick);

    return () => {
      isMounted = false;
      unregister();
      rootElement?.removeEventListener("contextmenu", onRightClick);
    };
  }, [editor, onRightClick]);

  const isExistImage = useMemo<boolean>(() => {
    return !!src;
  }, [src]);

  const selectionOnChange = useCallback(() => {
    if ($isNodeSelection(selection) && selection) {
      const hasNode = selection._nodes.has(nodeKey);
      setIsFocus(hasNode);
    } else {
      setIsFocus(false);
    }
  }, [nodeKey, selection]);

  useEffect(() => {
    selectionOnChange();
  }, [selection]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        imageWrapperRef.current &&
        !imageWrapperRef.current?.contains(event.target as Node)
      ) {
        // alert("Outside Clicked.");
        console.log("Outside Clicked. ");
        setIsActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [imageWrapperRef]);

  const isActiveImage = useMemo(() => isActive || isFocus, [isActive, isFocus]);

  return (
    <>
      {isExistImage && (
        <div
          className={cn(imageSize, "image-wrapper")}
          onClick={() => setIsActive(true)}
          ref={imageWrapperRef}
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
              className="icon-wrapper"
              onClick={() => setImageSize("fullScreen")}
            >
              <ImageFullScreenIcon
                className={cn("icon", imageSize === "fullScreen" && "active")}
              />
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
    </>
  );
};
export default memo(NiwiEditorImage);
