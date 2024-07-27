"use client";
import config from "@/config";
import useBlogComment from "@/feats/blog/hooks/useBlogComment";
import { CircleDashed, Play } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import { memo } from "react";
import TextareaAutosize from "react-textarea-autosize";

type NiwiBlogCreateCommentProps = {
  blogId: string;
  currentUser?: User;
};

const NiwiBlogCreateComment = ({
  blogId,
  currentUser,
}: NiwiBlogCreateCommentProps) => {
  const { createCommentSubmit, createCommentForm, createCommentLoading } =
    useBlogComment({
      blogId,
    });

  return (
    <section className="niwi-blog-comment-item">
      <div className="profile-section-container">
        <div className="img-container">
          <Image
            width={32}
            height={32}
            src={currentUser?.image || config.defaultUserImage}
            alt={currentUser?.name || ""}
          />
        </div>
        <div className="text-container">
          <div className="pf-text">{currentUser?.name || ""}</div>
          <div className="date-text">{"Create new comment ..."}</div>
        </div>
      </div>
      <div className="message-text">
        <form action={() => createCommentSubmit()}>
          <TextareaAutosize
            className="textarea"
            minRows={2}
            {...createCommentForm.register("comment")}
          />
          <button
            className="sent-button"
            type="submit"
            disabled={createCommentLoading}
          >
            {createCommentLoading ? (
              <CircleDashed className="animate-spin" size={12} />
            ) : (
              <Play size={12} />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default memo(NiwiBlogCreateComment);
