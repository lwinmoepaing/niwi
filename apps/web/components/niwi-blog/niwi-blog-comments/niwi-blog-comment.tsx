"use client";
import { User } from "next-auth";
import { memo, useMemo } from "react";
import NiwiBlogCommentSettingMenu from "./niwi-blog-comment-setting-menu";
import Image from "next/image";

type NiwiBlogCommentProps = {
  blogId: string;
  blogAuthorId: string;
  commentId: string;
  commentContent: string;
  commentAuthorId: string;
  commentAuthorImage: string;
  commentAuthorName: string;
  commentCreatedTime: string;
  currentUser?: User;
  isEditMode?: boolean;
  onSave: () => void;
};

const NiwiBlogComment = ({
  blogId,
  blogAuthorId,
  commentId,
  commentContent,
  commentAuthorId,
  commentCreatedTime,
  commentAuthorImage,
  commentAuthorName,
  currentUser,
}: NiwiBlogCommentProps) => {
  const isOwner = useMemo(() => {
    return blogAuthorId === currentUser?.id;
  }, []);

  const isCommentOwner = useMemo(() => {
    return commentAuthorId === currentUser?.id;
  }, []);

  return (
    <section className="niwi-blog-comment-item">
      <div className="profile-section-container">
        <div className="img-container">
          <Image
            width={32}
            height={32}
            src={commentAuthorImage}
            alt={commentAuthorName}
          />
        </div>
        <div className="text-container">
          <div className="pf-text">{commentAuthorName}</div>
          <div className="date-text">{commentCreatedTime}</div>
        </div>
      </div>
      <div className="message-text">
        <p>{commentContent}</p>
      </div>
      {isOwner || isCommentOwner ? (
        <NiwiBlogCommentSettingMenu
          commentId={commentId}
          blogId={blogId}
          onClickEdit={() => {}}
        />
      ) : null}
    </section>
  );
};

export default memo(NiwiBlogComment);
