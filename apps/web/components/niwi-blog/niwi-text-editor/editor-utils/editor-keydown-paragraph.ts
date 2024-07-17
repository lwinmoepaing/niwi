import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createTextNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isNodeSelection,
  BaseSelection,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

export const useEditorKeydown = ({ nodeKey }: { nodeKey: string }) => {
  const [editor] = useLexicalComposerContext();

  const replaceExisingTextWithParagraph = useCallback(
    (text: string, insert?: "down" | "up" | "middle") => {
      editor.update(() => {
        const p = $createParagraphNode();
        const textNode = $createTextNode(text);
        p.append(textNode);
        const node = $getNodeByKey(nodeKey);
        node?.replace(p);

        const isNextSibling = node?.getNextSibling();
        if (!isNextSibling && insert === "down") {
          insertNewParagraphToRoot(insert);
        } else if (isNextSibling && insert === "down") {
          return isNextSibling?.selectStart();
        }

        const isPreviousSibling = node?.getPreviousSibling();
        if (!isPreviousSibling && insert === "up") {
          insertNewParagraphToRoot(insert);
        } else if (isPreviousSibling && insert === "up") {
          return isPreviousSibling?.selectStart();
        }

        p.selectEnd();
      });
    },
    [editor, nodeKey]
  );

  const escapeWithParagraph = useCallback(
    (insert: "down" | "up") => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);

        const isNextSibling = node?.getNextSibling();
        if (!isNextSibling && insert === "down") {
          const newParagraph = insertNewParagraphToRoot(insert);
          newParagraph?.selectEnd();
        } else if (isNextSibling && insert === "down") {
          return isNextSibling?.selectEnd();
        }

        const isPreviousSibling = node?.getPreviousSibling();
        if (!isPreviousSibling && insert === "up") {
          const newParagraph = insertNewParagraphToRoot(insert);
          newParagraph?.selectEnd();
        } else if (isPreviousSibling && insert === "up") {
          return isPreviousSibling?.selectEnd();
        }
      });
    },
    [editor, nodeKey]
  );

  const insertNewParagraphToRoot = useCallback((insert: "down" | "up") => {
    try {
      const rootElement = $getRoot();
      const text = $createTextNode("");
      const p = $createParagraphNode().append(text);
      if (insert === "down") {
        rootElement?.append(p);
      } else if (insert === "up") {
        const firstChild = rootElement.getFirstChild();
        if (firstChild) {
          firstChild?.insertBefore(p);
        } else {
          rootElement?.append(p);
        }
      }
      return p;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    replaceExisingTextWithParagraph,
    escapeWithParagraph,
  };
};

export const useNodeFocus = ({ nodeKey }: { nodeKey: string }) => {
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      })
    );
    return () => {
      isMounted = false;
      unregister();
    };
  }, [editor]);

  useEffect(() => {
    if ($isNodeSelection(selection) && selection) {
      const hasNode = selection._nodes.has(nodeKey);
      setIsFocus(hasNode);
    } else {
      setIsFocus(false);
    }
  }, [selection]);

  return {
    isFocus,
  };
};

export const useNodeActive = <T extends Element>({
  handleOutside,
}: {
  handleOutside?: () => void;
}) => {
  const ref = useRef<T>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        setIsActive(false);
        handleOutside?.();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return {
    isActive,
    setIsActive,
    ref,
  };
};

export const useRemoveNode = ({ nodeKey }: { nodeKey: string }) => {
  const [editor] = useLexicalComposerContext();

  const removeNodeAndReplaceParagraph = useCallback(() => {
    editor.update(() => {
      const p = $createParagraphNode();
      const textNode = $createTextNode("");
      p.append(textNode);
      const node = $getNodeByKey(nodeKey);
      node?.replace(p);
      p.selectEnd();
    });
  }, [editor, nodeKey]);

  return {
    removeNodeAndReplaceParagraph,
  };
};
