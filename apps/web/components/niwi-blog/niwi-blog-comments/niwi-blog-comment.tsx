"use client";
import useBlogEditComment from "@/feats/blog/hooks/useBlogEditComment";
import { CircleDashed, Play } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import {
  KeyboardEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import NiwiBlogCommentSettingMenu from "./niwi-blog-comment-setting-menu";

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
  const ref = useRef<HTMLTextAreaElement>(null);

  const [isEdit, setIsEdit] = useState(false);

  const isBlogOwner = useMemo(() => {
    return blogAuthorId === currentUser?.id;
  }, []);

  const isCommentOwner = useMemo(() => {
    return commentAuthorId === currentUser?.id;
  }, []);

  const onEscape = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") setIsEdit(false);
  }, []);

  const onOpenEdit = useCallback(() => {
    if (isCommentOwner) {
      setIsEdit(true);
    }
  }, [isCommentOwner, ref?.current]);

  const onCloseEdit = useCallback(() => {
    if (isCommentOwner) {
      setIsEdit(false);
    }
  }, [isCommentOwner, ref?.current]);

  const { editCommentForm, editCommentLoading, editCommentSubmit } =
    useBlogEditComment({
      blogId,
      commentId,
      comment: commentContent,
      onSave: onCloseEdit,
    });

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
        {!isEdit ? (
          <p onDoubleClick={onOpenEdit}>{commentContent}</p>
        ) : (
          <form action={() => editCommentSubmit()}>
            <TextareaAutosize
              className="textarea"
              minRows={2}
              {...editCommentForm.register("comment")}
              onKeyUp={onEscape}
              disabled={editCommentLoading}
            />

            <button
              className="sent-button"
              type="submit"
              disabled={editCommentLoading}
            >
              {editCommentLoading ? (
                <CircleDashed className="animate-spin" size={12} />
              ) : (
                <Play size={12} />
              )}
            </button>
          </form>
        )}
      </div>
      {isBlogOwner || isCommentOwner ? (
        <NiwiBlogCommentSettingMenu
          commentAuthorId={commentAuthorId}
          commentId={commentId}
          onOpenEdit={onOpenEdit}
          onCloseEdit={onCloseEdit}
          isEdidMode={isEdit}
          isEditableForOwner={isCommentOwner}
        />
      ) : null}
    </section>
  );
};

export default memo(NiwiBlogComment);
