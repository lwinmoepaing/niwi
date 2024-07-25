"use client";
import ModalCrossIcon from "@/components/niwi-ui/button/modal-cross-button";
import NiwiOverlayPortal from "@/components/niwi-ui/overlay/niwi-overlay-portal";
import { cn } from "@/libs/utils";
import { memo, MouseEvent, useCallback } from "react";
import NiwiBlogCommentSettingMenu from "./niwi-blog-comment-setting-menu";

const NiwiComment = () => {
  return (
    <section className="niwi-blog-comment-item">
      <div className="profile-section-container">
        <div className="img-container"></div>
        <div className="text-container">
          <div className="pf-text">Lwin Moe Paing</div>
          <div className="date-text">7 days ago</div>
        </div>
      </div>
      <div className="message-text">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et temporibus
        </p>
      </div>
      <NiwiBlogCommentSettingMenu
        commentId={""}
        blogId={""}
        onClickEdit={() => {}}
      />
    </section>
  );
};

type NiwiBlogCommentsModalProps = {
  show: boolean;
  blogId: string;
  currentAuthId?: string;
  onClose: () => void;
};

function NiwiBlogCommentsModal({
  show,
  blogId,
  onClose,
}: NiwiBlogCommentsModalProps) {
  console.log(blogId);

  const stopPropagation = useCallback(
    (e: MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    []
  );

  return (
    <NiwiOverlayPortal show={show}>
      <div className={cn("niwi-overlay", show && "active")} onClick={onClose}>
        <div className="overflow-y-auto h-svh py-[16px]">
          <div className="niwi-blog-comments-modal" onClick={stopPropagation}>
            <ModalCrossIcon onClick={onClose} />
            <div className="niwi-blog-comment-item-container">
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
              <NiwiComment />
            </div>
          </div>
        </div>
      </div>
    </NiwiOverlayPortal>
  );
}
export default memo(NiwiBlogCommentsModal);
