import React from "react";
import { TCustomEditorActionType } from "../../../editor-utils/editor-utils";
import { cn } from "@/libs/utils";

type NiwiToolBarItemListProps = {
  // eslint-disable-next-line no-unused-vars
  checkActiveButton: (value: TCustomEditorActionType) => boolean;
  // eslint-disable-next-line no-unused-vars
  onClickAction: (value: TCustomEditorActionType) => void;
};

const NiwiToolBarItemList = ({
  checkActiveButton,
  onClickAction,
}: NiwiToolBarItemListProps) => {
  return (
    <div className="container">
      <span
        className={cn(checkActiveButton("h1") && "active")}
        onClick={() => onClickAction("h1")}
      >
        H1
      </span>
      <span
        className={cn(checkActiveButton("h2") && "active")}
        onClick={() => onClickAction("h2")}
      >
        H2
      </span>
      <span
        className={cn(checkActiveButton("bold") && "active")}
        onClick={() => onClickAction("bold")}
      >
        B
      </span>
      <span
        className={cn(checkActiveButton("italic") && "active")}
        onClick={() => onClickAction("italic")}
      >
        I
      </span>
      <span
        className={cn(checkActiveButton("underline") && "active")}
        onClick={() => onClickAction("underline")}
      >
        U
      </span>
      <span
        className={cn(checkActiveButton("ol") && "active")}
        onClick={() => onClickAction("ol")}
      >
        ol
      </span>
      <span
        className={cn(checkActiveButton("ul") && "active")}
        onClick={() => onClickAction("ul")}
      >
        ul
      </span>
      <span
        className={cn(checkActiveButton("link") && "active")}
        onClick={() => onClickAction("link")}
      >
        Link
      </span>
    </div>
  );
};
export default NiwiToolBarItemList;
