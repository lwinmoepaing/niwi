"use client";
import ModalCrossIcon from "@/components/niwi-ui/button/modal-cross-button";
import NiwiOverlayPortal from "@/components/niwi-ui/overlay/niwi-overlay-portal";
import { cn } from "@/libs/utils";
import { memo, MouseEvent, useCallback } from "react";
import NiwiBlogComment from "./niwi-blog-comment";
import { User } from "next-auth";

type NiwiBlogCommentsModalProps = {
  show: boolean;
  blogId: string;
  blogAuthorId: string;
  authUser?: User;
  onClose: () => void;
};

function NiwiBlogCommentsModal({
  blogAuthorId,
  show,
  onClose,
  authUser,
}: NiwiBlogCommentsModalProps) {
  const stopPropagation = useCallback(
    (e: MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    []
  );

  return (
    <NiwiOverlayPortal show={show}>
      <div className={cn("niwi-overlay", show && "active")} onClick={onClose}>
        <div className="overflow-y-auto h-svh py-[16px] px-[20px]">
          <div className="niwi-blog-comments-modal" onClick={stopPropagation}>
            <ModalCrossIcon onClick={onClose} />
            <div className="niwi-blog-comment-item-container">
              <NiwiBlogComment
                blogId={"1"}
                blogAuthorId={blogAuthorId}
                commentId={blogAuthorId}
                commentContent="Lorem Ipsum Lorem Ipsum"
                commentAuthorId={blogAuthorId}
                commentAuthorImage={"/images/auth/profile.png"}
                commentAuthorName={"Lwin"}
                commentCreatedTime={"7 days ago"}
                currentUser={authUser}
                isEditMode={true}
                onSave={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </NiwiOverlayPortal>
  );
}
export default memo(NiwiBlogCommentsModal);
