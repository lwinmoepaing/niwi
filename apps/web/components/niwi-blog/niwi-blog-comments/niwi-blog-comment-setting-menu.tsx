"use client";

import { cn } from "@/libs/utils";
import { FilePenLine, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type NiwiBlogCommentSettingMenuProps = {
  commentContent: string;
  commentId: string;
  blogId: string;
  isEdidMode: boolean;
  isEditableForOwner: boolean;
  onOpenEdit: () => void;
  onCloseEdit: () => void;
};

function NiwiBlogCommentSettingMenu({
  onOpenEdit,
  onCloseEdit,
  isEdidMode,
  isEditableForOwner,
}: NiwiBlogCommentSettingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        setActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      className={cn("niwi-blog-setting-menu", active && "active")}
      onClick={toggleActive}
      ref={ref}
    >
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />

      <div className={cn("menu min-w-[150px]", active && "active")}>
        {isEditableForOwner ? (
          isEdidMode ? (
            <button type="button" className="" onClick={onCloseEdit}>
              <FilePenLine size={14} className="icon" />
              <span className="button-text">Cancel Editing</span>
            </button>
          ) : (
            <button type="button" className="" onClick={onOpenEdit}>
              <FilePenLine size={14} className="icon" />
              <span className="button-text">Edit Comment</span>
            </button>
          )
        ) : null}

        <button type="button" className="" onClick={() => {}}>
          <X size={14} className="icon" />
          <span className="button-text">Delete Comment</span>
        </button>
      </div>
    </div>
  );
}
export default NiwiBlogCommentSettingMenu;
