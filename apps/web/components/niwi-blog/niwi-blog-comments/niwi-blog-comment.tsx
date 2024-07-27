"use client";
import { Play } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import {
  ChangeEvent,
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

  const isOwner = useMemo(() => {
    return blogAuthorId === currentUser?.id;
  }, []);

  const isCommentOwner = useMemo(() => {
    return commentAuthorId === currentUser?.id;
  }, []);

  const onEscape = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") setIsEdit(false);
  }, []);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log({ value });
  }, []);

  const onClickEdit = useCallback(() => {
    if (isOwner || isCommentOwner) {
      // ref.current?.focus();
      setIsEdit((prev) => !prev);
    }
  }, [isOwner, isCommentOwner, ref?.current]);

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
          <p onDoubleClick={onClickEdit}>{commentContent}</p>
        ) : (
          <>
            <TextareaAutosize
              ref={ref}
              className="textarea"
              onChange={onChangeText}
              onKeyUp={onEscape}
              defaultValue={commentContent}
              minRows={2}
            />
            <span className="sent-button">
              <Play size={12} />
            </span>
          </>
        )}
      </div>
      {isOwner || isCommentOwner ? (
        <NiwiBlogCommentSettingMenu
          commentId={commentId}
          blogId={blogId}
          onClickEdit={onClickEdit}
          isEdidMode={isEdit}
        />
      ) : null}
    </section>
  );
};

export default memo(NiwiBlogComment);
