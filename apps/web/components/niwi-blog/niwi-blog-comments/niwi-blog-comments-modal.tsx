"use client";
import ModalCrossIcon from "@/components/niwi-ui/button/modal-cross-button";
import NiwiOverlayPortal from "@/components/niwi-ui/overlay/niwi-overlay-portal";
import { useGetCommentsByBlogId } from "@/feats/blog/api/get-blog-comments-by-blog-id";
import { cn } from "@/libs/utils";
import { BlogComment } from "@/types/blog-response";
import { User } from "next-auth";
import { memo, MouseEvent, useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import NiwiBlogComment from "./niwi-blog-comment";
import NiwiBlogCreateComment from "./niwi-blog-create-comment";
import dateUtil from "@/libs/date/date-util";
import NiwiBlogCommentLoading from "./niwi-blog-comment-loading";
import NiwiBLogEmptyCommentBox from "./niwi-blog-empty-comment-box";

type NiwiBlogCommentsModalProps = {
  show: boolean;
  blogId: string;
  blogAuthorId: string;
  authUser?: User;
  onClose: () => void;
};

function NiwiBlogCommentsModal({
  blogId,
  blogAuthorId,
  show,
  onClose,
  authUser,
}: NiwiBlogCommentsModalProps) {
  const { ref, inView } = useInView({ threshold: 0 });
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useGetCommentsByBlogId({
      pageNo: 1,
      blogId,
    });

  const commentList = useMemo<BlogComment[]>(() => {
    if (!data?.pages) return [];
    return data.pages.reduce((prev, next) => {
      return [...prev, ...next.data];
    }, [] as BlogComment[]);
  }, [data]);

  const isEmptyList = useMemo(() => {
    return !isFetching && commentList.length <= 0;
  }, [commentList]);

  const stopPropagation = useCallback(
    (e: MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    []
  );

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  return (
    <NiwiOverlayPortal show={show}>
      <div className={cn("niwi-overlay", show && "active")} onClick={onClose}>
        <div className="overflow-y-auto h-svh py-[16px] px-[20px] overflow-x-hidden">
          <div className="niwi-blog-comments-modal" onClick={stopPropagation}>
            <ModalCrossIcon onClick={onClose} />
            <div className="niwi-blog-comment-item-container">
              {!!authUser && (
                <NiwiBlogCreateComment blogId={blogId} currentUser={authUser} />
              )}
              {!isFetching && isEmptyList && <NiwiBLogEmptyCommentBox />}
              {commentList.map((comment) => (
                <NiwiBlogComment
                  key={comment.id}
                  blogId={blogId}
                  blogAuthorId={blogAuthorId}
                  commentId={comment.id}
                  commentAuthorId={comment.userId}
                  commentContent={comment.content}
                  commentAuthorImage={comment.user.image}
                  commentAuthorName={comment.user.name}
                  commentCreatedTime={dateUtil(comment.createdAt).fromNow()}
                  currentUser={authUser}
                />
              ))}
              {isFetching ? (
                <>
                  <NiwiBlogCommentLoading />
                  <NiwiBlogCommentLoading />
                  <NiwiBlogCommentLoading />
                </>
              ) : (
                <div ref={ref} className="h-[20px]"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </NiwiOverlayPortal>
  );
}
export default memo(NiwiBlogCommentsModal);
