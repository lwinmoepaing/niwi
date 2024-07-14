import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { ElementFormatType, TextFormatType } from "lexical";
import { useCallback, useEffect, useState } from "react";
import {
  checkIsElementFormatType,
  checkIsFormatType,
  checkIsHeaderType,
  checkListType,
  formatTypeList,
  getElementBySelection,
  getSelectedNodeBySelection,
  headingTags,
  listTypeList,
  ListNodeTagType,
  TCustomEditorActionType,
} from "../../../editor-utils/editor-utils";

const LowPriority = 1;

const useNiwiToolBarAction = () => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  );
  const [isLink, setIsLink] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState<
    TCustomEditorActionType[]
  >([]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    let allSelectedEvents = [...selectedEventTypes];

    console.log({ selection });
    // inner function
    const pushInEventTypesState = (
      selectionFormat: boolean,
      event: TCustomEditorActionType
    ) => {
      if (selectionFormat) {
        if (selectedEventTypes.includes(event)) return;
        else allSelectedEvents.push(event);
      } else {
        allSelectedEvents = allSelectedEvents.filter((ev) => ev !== event);
      }
    };

    const pushInGenericTypesState = (
      selectionFormat: boolean,
      event: TCustomEditorActionType
    ) => {
      const data = [...listTypeList, ...headingTags];
      const removeEvents = allSelectedEvents.filter(
        (ev) => !data.includes(ev as HeadingTagType | ListNodeTagType)
      );
      allSelectedEvents = removeEvents;
      if (selectionFormat) {
        allSelectedEvents.push(event);
      }
    };

    // range selection ( e.g like to bold only the particular area of the text)
    if ($isRangeSelection(selection)) {
      const { anchorNode, element, elementKey, elementDOM } =
        getElementBySelection(selection, editor);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        const isListing = $isListNode(element);
        if (isListing) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          pushInGenericTypesState(isListing, type);
          setBlockType(type);
        } else {
          const isHeading = $isHeadingNode(element);
          const type = isHeading
            ? element.getTag()
            : (element.getType() as "paragraph");
          pushInGenericTypesState(isHeading, type);
          setBlockType(type);
        }
      }

      formatTypeList.forEach((data) => {
        pushInEventTypesState(selection.hasFormat(data), data);
      });

      const node = getSelectedNodeBySelection(selection);
      const parent = node.getParent();
      const isIncludeLink = allSelectedEvents.includes("link");
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        if (!isIncludeLink) allSelectedEvents.push("link");
        setIsLink(true);
      } else {
        if (isIncludeLink) {
          allSelectedEvents = allSelectedEvents.filter((ev) => ev !== "link");
        }
        setIsLink(false);
      }

      setSelectedEventTypes(allSelectedEvents);
    }
  }, [editor, selectedEventTypes]);

  const handleHeadingFormat = useCallback(
    (type: HeadingTagType) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () =>
            blockType !== type
              ? $createHeadingNode(type)
              : $createParagraphNode()
          );
        }
      });
    },
    [blockType, editor]
  );

  const handleListFormat = useCallback(
    (type: ListNodeTagType) => {
      const undefy: void = undefined;
      const dispatchType =
        blockType === type
          ? REMOVE_LIST_COMMAND // If Undo Liststyle.
          : type === "ol"
            ? INSERT_ORDERED_LIST_COMMAND
            : INSERT_UNORDERED_LIST_COMMAND;
      editor.dispatchCommand(dispatchType, undefy);
    },
    [blockType, editor]
  );

  const handleFormatLink = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, !isLink ? "https://" : null);
  }, [editor, isLink]);

  const onClickAction = useCallback(
    (type: TCustomEditorActionType) => {
      if (checkIsFormatType(type)) {
        return editor.dispatchCommand(
          FORMAT_TEXT_COMMAND,
          type as TextFormatType
        );
      }

      if (checkIsElementFormatType(type)) {
        return editor.dispatchCommand(
          FORMAT_ELEMENT_COMMAND,
          type as ElementFormatType
        );
      }

      if (checkIsHeaderType(type)) {
        return handleHeadingFormat(type as HeadingTagType);
      }

      if (checkListType(type)) {
        return handleListFormat(type as ListNodeTagType);
      }

      if (type === "link") {
        return handleFormatLink();
      }
    },
    [editor, handleHeadingFormat, handleListFormat, handleFormatLink]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const checkActiveButton = useCallback(
    (str: TCustomEditorActionType) => {
      return selectedEventTypes.includes(str);
    },
    [selectedEventTypes]
  );

  return {
    isLink,
    selectedElementKey,
    selectedEventTypes,
    onClickAction,
    checkActiveButton,
  };
};
export default useNiwiToolBarAction;
