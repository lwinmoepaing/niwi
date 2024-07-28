import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createBlogCommentAction } from "../actions/blog.action";
import { addNewCommentQueryCacheUpdate } from "../services/blog-query-cache.service";
import {
  CreateBlogCommentFormValues,
  createBlogCommentSchema,
} from "../validations/blog.validation";
import useBlogStore from "@/stores/blog/blog.store";

const useBlogComment = ({ blogId }: { blogId: string }) => {
  const [currentBlog, updateComment] = useBlogStore((store) => [
    store.currentBlog,
    store.updateComment,
  ]);

  const [createCommentResponse, dispatchForm, createCommentLoading] =
    useActionState(createBlogCommentAction, undefined);

  const createCommentForm = useForm<CreateBlogCommentFormValues>({
    resolver: zodResolver(createBlogCommentSchema),
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

      const newComment = createCommentResponse.data;
      if (newComment) {
        addNewCommentQueryCacheUpdate(newComment);
      }

      if (currentBlog) {
        updateComment("INCREMENT");
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
