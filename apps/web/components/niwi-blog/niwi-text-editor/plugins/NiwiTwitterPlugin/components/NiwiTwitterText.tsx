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
import { $createNiwiTwitterNode } from "../nodes/NiwiTwitterNode";
import { NiwiTwitterTextPropsType } from "../nodes/NiwiTwitterTextNode";

type NiwiTwitterTextProps = NiwiTwitterTextPropsType & { nodeKey: string };

const twitterPostUrlPattern =
  /^https?:\/\/(www\.)?twitter\.com\/\w+\/status\/\d+$/;
const xPostUrlPattern = /^https?:\/\/(www\.)?x\.com\/\w+\/status\/\d+$/;

const urlSchema = z
  .string()
  .refine(
    (url) => twitterPostUrlPattern.test(url) || xPostUrlPattern.test(url),
    {
      message: "Invalid URL. URL must be a valid Twitter or X.com post.",
    }
  );

const parseTweetID = (url: string) => {
  const match =
    /^https:\/\/(twitter|x)\.com\/(#!\/)?(\w+)\/status(es)*\/(\d+)/.exec(url);

  if (match != null) {
    return match[5];
  }

  return "";
};

function NiwiTwitterText({ placeholder, nodeKey }: NiwiTwitterTextProps) {
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

      const { success } = urlSchema.safeParse(inputValue);

      if (!success) {
        replaceExisingTextWithParagraph(inputValue, "middle");
        return;
      }

      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        const id = parseTweetID(inputValue);
        if (id) {
          const tweetNode = $createNiwiTwitterNode(id);
          node?.replace(tweetNode);
          const isSibling = tweetNode.getNextSibling();
          if (!isSibling) {
            const text = $createTextNode("");
            const p = $createParagraphNode().append(text);
            tweetNode.insertAfter(p);
          }
          tweetNode.selectEnd();
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
export default memo(NiwiTwitterText);
