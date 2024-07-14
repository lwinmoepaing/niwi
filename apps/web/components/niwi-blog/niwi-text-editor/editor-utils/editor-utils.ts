import { HeadingTagType } from "@lexical/rich-text";
import { $isAtNodeEnd } from "@lexical/selection";
import {
  $isRangeSelection,
  EditorState,
  ElementNode,
  LexicalEditor,
  RangeSelection,
} from "lexical";

export type ElementFormatType =
  | "left"
  | "start"
  | "center"
  | "right"
  | "end"
  | "justify"
  | "";

export type TextFormatType =
  | "bold"
  | "underline"
  | "strikethrough"
  | "italic"
  | "highlight"
  | "code"
  | "subscript"
  | "superscript";

export type ListNodeTagType = "ul" | "ol";

export type TCustomEditorActionType =
  | TextFormatType
  | ElementFormatType
  | HeadingTagType
  | ListNodeTagType
  | "paragraph"
  | "link";

export const headingTags: HeadingTagType[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

export const formatTypeList: TextFormatType[] = [
  "bold",
  "underline",
  "strikethrough",
  "italic",
  "highlight",
  "code",
  "subscript",
  "superscript",
];

export const eleFormatTypeList: ElementFormatType[] = [
  "left",
  "start",
  "center",
  "right",
  "end",
  "justify",
];

export const listTypeList: ListNodeTagType[] = ["ul", "ol"];

export const checkListType = (type: TCustomEditorActionType): boolean => {
  return listTypeList.includes(type as ListNodeTagType);
};

export const checkIsFormatType = (type: TCustomEditorActionType): boolean => {
  return formatTypeList.includes(type as TextFormatType);
};

export const checkIsElementFormatType = (
  type: TCustomEditorActionType
): boolean => {
  return eleFormatTypeList.includes(type as ElementFormatType);
};

export const checkIsHeaderType = (type: TCustomEditorActionType): boolean => {
  return headingTags.includes(type as HeadingTagType);
};

export const getElementBySelection = (
  selection: RangeSelection,
  editor: LexicalEditor
) => {
  const anchorNode = selection.anchor.getNode() as ElementNode;
  const element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : anchorNode.getTopLevelElementOrThrow();
  const elementKey = element.getKey();
  const elementDOM = editor.getElementByKey(elementKey);
  return {
    anchorNode,
    element,
    elementKey,
    elementDOM,
  };
};

export const getSelectedNodeBySelection = function (selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }

  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  }

  return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
};

export function $isRangeSelected(
  selection: EditorState["_selection"]
): selection is RangeSelection {
  return $isRangeSelection(selection) && !selection.anchor.is(selection.focus);
}
