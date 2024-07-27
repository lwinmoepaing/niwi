import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createBlogCommentAction } from "../actions/blog.action";
import {
  UpdateBlogCommentFormValues,
  updateBlogCommentSchema,
} from "../validations/blog.validation";
import toast from "react-hot-toast";

const useBlogComment = ({ blogId }: { blogId: string }) => {
  const [createCommentResponse, dispatchForm, createCommentLoading] =
    useActionState(createBlogCommentAction, undefined);

  const createCommentForm = useForm<UpdateBlogCommentFormValues>({
    resolver: zodResolver(updateBlogCommentSchema),
    defaultValues: {
      comment: "",
      blogId,
    },
  });

  const resetForm = useCallback(() => {
    createCommentForm.reset(
      {
        comment: "",
        blogId,
      },
      { keepDefaultValues: false }
    );
  }, [createCommentForm.reset]);

  useEffect(() => {
    if (createCommentResponse?.success === true) {
      toast.success(createCommentResponse.message);

      const newBlog = createCommentResponse.data;
      if (newBlog) {
        // const blogId = createCommentResponse.data?.blogId;
        // createBlogCacheUpdate(newBlog);
      }

      resetForm();
      return;
    }

    if (createCommentResponse?.success === false) {
      toast.error(createCommentResponse.message);
      return;
    }
  }, [createCommentResponse, resetForm]);

  return {
    createCommentForm,
    createCommentResponse,
    createCommentLoading,
    createCommentSubmit: createCommentForm.handleSubmit(dispatchForm),
  };
};

export default useBlogComment;
