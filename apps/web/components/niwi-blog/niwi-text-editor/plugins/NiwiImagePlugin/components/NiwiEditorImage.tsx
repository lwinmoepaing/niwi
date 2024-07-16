import { cn } from "@/libs/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  BaseSelection,
} from "lexical";
import Image from "next/image";
import {
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
import { NiwiImageNodePropsType } from "../nodes/NiwiImageNode";

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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [placeHolder, setPlaceHolder] = useState<string>("");

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
      if (hasNode) captionRef?.current?.focus();
      setIsFocus(hasNode);
    } else {
      setIsFocus(false);
    }
  }, [nodeKey, selection, captionRef]);

  useEffect(() => {
    selectionOnChange();
  }, [selection]);

  const handleKeyDownCaption = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowUp":
          captionRef?.current?.blur();
          editor.update(() => {
            const currentNode = $getNodeByKey(nodeKey);
            const prevSibling = currentNode?.getPreviousSibling();
            if (prevSibling) {
              const prevSiblingDOM = editor.getElementByKey(
                prevSibling.getKey()
              );
              if (prevSiblingDOM) {
                const inputElement = prevSiblingDOM.querySelector("p");
                if (inputElement) {
                  inputElement.focus();
                }
              }
            }
          });
          return;
        case "ArrowDown":
          captionRef?.current?.blur();
          editor.update(() => {
            const currentNode = $getNodeByKey(nodeKey);
            const nextSibling = currentNode?.getNextSibling();
            if (nextSibling) {
              const nextSiblingDOM = editor.getElementByKey(
                nextSibling.getKey()
              );
              if (nextSiblingDOM) {
                const inputElement = nextSiblingDOM.querySelector("p");
                if (inputElement) {
                  inputElement.focus();
                }
              }
            }
          });
          return;
      }
    },
    []
  );

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        imageWrapperRef.current &&
        !imageWrapperRef.current?.contains(event.target as Node)
      ) {
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
          onClick={() => {
            setIsActive(true);
            captionRef?.current?.focus();
          }}
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
        onChange={(e) => {
          setPlaceHolder(e.target.value);
          editor.update(() => {
            updatePlaceHolder(e.target.value);
          });
        }}
        onKeyDown={handleKeyDownCaption}
        value={placeHolder}
      />
    </>
  );
};
export default memo(NiwiEditorImage);
