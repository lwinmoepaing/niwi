import React from "react";
import { TCustomEditorActionType } from "../../../editor-utils/editor-utils";
import { cn } from "@/libs/utils";
import {
  Heading1,
  Heading2,
  Bold,
  Italic,
  ListOrdered,
  List,
  Underline,
  Link,
} from "lucide-react";

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
    <div className="niwi-editor-toolbar-container">
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("h1") && "active"
        )}
        onClick={() => onClickAction("h1")}
      >
        <Heading1 size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("h2") && "active"
        )}
        onClick={() => onClickAction("h2")}
      >
        <Heading2 size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("bold") && "active"
        )}
        onClick={() => onClickAction("bold")}
      >
        <Bold size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("italic") && "active"
        )}
        onClick={() => onClickAction("italic")}
      >
        <Italic size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("underline") && "active"
        )}
        onClick={() => onClickAction("underline")}
      >
        <Underline size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("ol") && "active"
        )}
        onClick={() => onClickAction("ol")}
      >
        <ListOrdered size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("ul") && "active"
        )}
        onClick={() => onClickAction("ul")}
      >
        <List size={20} />
      </span>
      <span
        className={cn(
          "niwi-editor-toolbar-btn",
          checkActiveButton("link") && "active"
        )}
        onClick={() => onClickAction("link")}
      >
        <Link size={20} />
      </span>
    </div>
  );
};
export default NiwiToolBarItemList;
