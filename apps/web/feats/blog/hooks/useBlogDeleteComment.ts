import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { deleteBlogCommentAction } from "../actions/blog.action";
import {
  DeleteBlogCommentFormValues,
  deleteBlogCommentSchema,
} from "../validations/blog.validation";
import { deleteCommentQueryCacheUpdate } from "../services/blog-query-cache.service";

const useBlogDeleteComment = ({
  authorId,
  commentId,
}: {
  authorId: string;
  commentId: string;
}) => {
  const [deleteCommentResponse, dispatchForm, deleteCommentLoading] =
    useActionState(deleteBlogCommentAction, undefined);

  const deleteCommentForm = useForm<DeleteBlogCommentFormValues>({
    resolver: zodResolver(deleteBlogCommentSchema),
    defaultValues: {
      commentId,
      userId: authorId,
    },
  });

  useEffect(() => {
    if (deleteCommentResponse?.success === true) {
      toast.success(deleteCommentResponse.message);
      const deletedComment = deleteCommentResponse.data;
      if (deletedComment) {
        deleteCommentQueryCacheUpdate(deletedComment);
        deleteCommentForm.reset(
          {
            commentId,
            userId: authorId,
          },
          { keepDefaultValues: false }
        );
      }
      return;
    }

    if (deleteCommentResponse?.success === false) {
      toast.error(deleteCommentResponse.message);
      return;
    }
  }, [deleteCommentResponse, deleteCommentForm.reset]);

  return {
    deleteCommentForm,
    deleteCommentResponse,
    deleteCommentLoading,
    deleteCommentSubmit: deleteCommentForm.handleSubmit(dispatchForm),
  };
};

export default useBlogDeleteComment;
