import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, BaseSelection } from "lexical";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type NiwiEditorImageProps = {
  src: string;
  nodeKey: string;
};

const NiwiEditorImage = ({ src }: NiwiEditorImageProps) => {
  const [editor] = useLexicalComposerContext();
  const [, setSelection] = useState<BaseSelection | null>(null);

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

  return (
    <div>
      {isExistImage && (
        <div>
          <Image src={src || ""} alt={""} width={800} height={400} />
        </div>
      )}
      {/* <input placeholder="caption..." type="text" ref={captionRef} /> */}
    </div>
  );
};
export default NiwiEditorImage;
