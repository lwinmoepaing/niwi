"use client";

import useDeleteBlogForm from "@/app/(protected)/dashboard/blogs/assets/hooks/useDeletedBlogForm";
import Button from "@/components/niwi-ui/button/button";
import ModalCrossIcon from "@/components/niwi-ui/button/modal-cross-button";
import NiwiOverlayPortal from "@/components/niwi-ui/overlay/niwi-overlay-portal";
import { cn } from "@/libs/utils";
import { CircleDashed, Delete, Edit } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type NiwiBlogSettingMenuProps = {
  blogId: string;
};

function NiwiBlogSettingMenu({ blogId }: NiwiBlogSettingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    pending,
    handleSubmit,
    showDeleteDialog,
    onShowDeleteDialog,
    onCancelDeleteDialog,
  } = useDeleteBlogForm({ blogId });

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

      <div className={cn("menu", active && "active")}>
        <button type="button" className="">
          <Edit size={14} className="icon" />
          <Link href={`/dashboard/blogs/${blogId}`} className="button-text">
            Edit Blog
          </Link>
        </button>
        <button type="button" className="" onClick={onShowDeleteDialog}>
          <Delete size={14} className="icon" />
          <span className="button-text">Delete Blog</span>
        </button>
      </div>

      {showDeleteDialog && (
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
      )}
    </div>
  );
}
export default NiwiBlogSettingMenu;
