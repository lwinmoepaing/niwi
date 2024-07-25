"use client";

import { cn } from "@/libs/utils";
import { FilePenLine, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type NiwiBlogCommentSettingMenuProps = {
  commentId: string;
  blogId: string;
  onClickEdit: () => void;
};

function NiwiBlogCommentSettingMenu({
  onClickEdit,
}: NiwiBlogCommentSettingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  //   const {
  //     pending,
  //     handleSubmit,
  //     showDeleteDialog,
  //     onShowDeleteDialog,
  //     onCancelDeleteDialog,
  //   } = useDeleteBlogForm({ commentId });

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
        <button type="button" className="" onClick={onClickEdit}>
          <FilePenLine size={14} className="icon" />
          <span className="button-text">Edit Comment</span>
        </button>
        <button type="button" className="" onClick={() => {}}>
          <X size={14} className="icon" />
          <span className="button-text">Delete Comment</span>
        </button>
      </div>

      {/* {showDeleteDialog && (
        <NiwiOverlayPortal show={showDeleteDialog}>
          <div
            className={cn("niwi-overlay", showDeleteDialog && "active")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="niwi-overlay-content">
              <h2 className="niwi-logo-text header">
                Are you sure to delete this blog ?
              </h2>
              <div className="niwi-overlay-actions">
                <Button
                  className="flex-1"
                  disabled={pending}
                  variant={"outline"}
                  onClick={onCancelDeleteDialog}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  disabled={pending}
                  onClick={handleSubmit}
                >
                  {pending ? (
                    <CircleDashed className="animate-spin" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>

              <ModalCrossIcon onClick={onCancelDeleteDialog} />
            </div>
          </div>
        </NiwiOverlayPortal>
      )} */}
    </div>
  );
}
export default NiwiBlogCommentSettingMenu;
