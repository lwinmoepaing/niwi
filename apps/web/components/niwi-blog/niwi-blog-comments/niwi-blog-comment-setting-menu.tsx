"use client";

import useBlogDeleteComment from "@/feats/blog/hooks/useBlogDeleteComment";
import { cn } from "@/libs/utils";
import { CircleDashed, FilePenLine, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type NiwiBlogCommentSettingMenuProps = {
  commentId: string;
  commentAuthorId: string;
  isEdidMode: boolean;
  isEditableForOwner: boolean;
  onOpenEdit: () => void;
  onCloseEdit: () => void;
};

function NiwiBlogCommentSettingMenu({
  commentId,
  commentAuthorId,
  isEdidMode,
  isEditableForOwner,
  onOpenEdit,
  onCloseEdit,
}: NiwiBlogCommentSettingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const { deleteCommentLoading, deleteCommentSubmit } = useBlogDeleteComment({
    authorId: commentAuthorId,
    commentId,
  });

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
      {!deleteCommentLoading ? (
        <>
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </>
      ) : (
        <CircleDashed className="animate-spin text-[#ff4175]" />
      )}

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

        <button
          type="button"
          className=""
          onClick={() => deleteCommentSubmit()}
        >
          <X size={14} className="icon" />
          <span className="button-text">Delete Comment</span>
        </button>
      </div>
    </div>
  );
}
export default NiwiBlogCommentSettingMenu;
