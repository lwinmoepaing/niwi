import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $getNodeByKey } from "lexical";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import {
  useEditorKeydown,
  useNodeActive,
} from "../../../editor-utils/editor-keydown-paragraph";
import { $createNiwiYoutubeNode } from "../nodes/NiwiYoutubeNode";
import { NiwiYoutubeTextPropsType } from "../nodes/NiwiYoutubeTextNode";

type NiwiYoutubeTextProps = NiwiYoutubeTextPropsType & { nodeKey: string };

// Regular expression to validate YouTube URLs
const youtubeUrlRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

// Custom validation function for YouTube URLs
const youtubeUrlValidator = z
  .string()
  .refine((url) => youtubeUrlRegex.test(url), {
    message: "Invalid YouTube URL",
  });

// Schema for validating YouTube URLs
const schema = z.object({
  youtubeUrl: youtubeUrlValidator,
});

const parseYoutubeID = (url: string) => {
  const match =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

  const id = match ? (match?.[2]?.length === 11 ? match[2] : null) : null;

  return id;
};

function NiwiYoutubeText({ placeholder, nodeKey }: NiwiYoutubeTextProps) {
  const [value, setValue] = useState<string>("");
  const [editor] = useLexicalComposerContext();

  const { replaceExisingTextWithParagraph } = useEditorKeydown({ nodeKey });
  const { ref: inputRef } = useNodeActive<HTMLInputElement>({
    handleOutside: () => {
      replaceExisingTextWithParagraph("", "middle");
    },
  });

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);

      const { success } = schema.safeParse({ youtubeUrl: inputValue });

      if (!success) {
        replaceExisingTextWithParagraph(inputValue, "middle");
        return;
      }

      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        const id = parseYoutubeID(inputValue);
        if (id) {
          const youtubeNode = $createNiwiYoutubeNode(id);
          node?.replace(youtubeNode);
          youtubeNode.selectEnd();
          const isSibling = youtubeNode.getNextSibling();
          if (!isSibling) {
            const text = $createTextNode("");
            const p = $createParagraphNode().append(text);
            youtubeNode.insertAfter(p);
          }
        }
      });
    },
    [replaceExisingTextWithParagraph]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const value = inputRef?.current?.value || "";
      switch (event.key) {
        case "ArrowUp":
          replaceExisingTextWithParagraph(value, "up");
          return;
        case "ArrowDown":
        case "Enter":
          replaceExisingTextWithParagraph(value, "down");
          return;
        case "Delete":
        case "Backspace":
          replaceExisingTextWithParagraph(value, "up");
          return;
      }
    },
    [replaceExisingTextWithParagraph]
  );

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  return (
    <>
      <input
        ref={inputRef}
        className="niwi-editor-placeholder"
        placeholder={placeholder}
        onChange={handleInput}
        onKeyDown={onKeyDown}
        value={value}
      />
    </>
  );
}
export default memo(NiwiYoutubeText);
