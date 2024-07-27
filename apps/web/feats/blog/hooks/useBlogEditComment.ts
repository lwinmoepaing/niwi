import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateBlogCommentAction } from "../actions/blog.action";
import {
  UpdateBlogCommentFormValues,
  updateBlogCommentSchema,
} from "../validations/blog.validation";
import { updateNewCommentQueryCacheUpdate } from "../services/blog-query-cache.service";

const useBlogEditComment = ({
  blogId,
  commentId,
  comment,
  onSave,
}: {
  blogId: string;
  commentId: string;
  comment: string;
  onSave: () => void;
}) => {
  const [editCommentResponse, dispatchForm, editCommentLoading] =
    useActionState(updateBlogCommentAction, undefined);

  const editCommentForm = useForm<UpdateBlogCommentFormValues>({
    resolver: zodResolver(updateBlogCommentSchema),
    defaultValues: {
      commentId,
      comment,
      blogId,
    },
  });

  useEffect(() => {
    if (editCommentResponse?.success === true) {
      toast.success(editCommentResponse.message);
      const newComment = editCommentResponse.data;
      if (newComment) {
        updateNewCommentQueryCacheUpdate(newComment);
        editCommentForm.reset(
          {
            comment: newComment.content,
            blogId,
            commentId,
          },
          { keepDefaultValues: false }
        );
        onSave?.();
      }
      return;
    }

    if (editCommentResponse?.success === false) {
      toast.error(editCommentResponse.message);
      return;
    }
  }, [editCommentResponse, editCommentForm.reset]);

  return {
    editCommentForm,
    editCommentResponse,
    editCommentLoading,
    editCommentSubmit: editCommentForm.handleSubmit(dispatchForm),
  };
};

export default useBlogEditComment;
