import { deleteBlogAction } from "@/feats/blog/actions/blog.action";
import { deleteBlogQueryCacheUpdate } from "@/feats/blog/services/blog-query-cache.service";
import {
  deleteBlogByIdSchema,
  DeleteBlogFormValues,
} from "@/feats/blog/validations/blog.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useDeleteBlogForm = ({ blogId }: { blogId: string }) => {
  const [deleteBlogResponse, dispatchDeleteBlog, pending] = useActionState(
    deleteBlogAction,
    undefined
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { handleSubmit } = useForm<DeleteBlogFormValues>({
    resolver: zodResolver(deleteBlogByIdSchema),
    defaultValues: { blogId },
  });

  const submit = useCallback(
    async (values: DeleteBlogFormValues) => {
      dispatchDeleteBlog(values);
    },
    [dispatchDeleteBlog]
  );

  const onShowDeleteDialog = useCallback(() => {
    setShowDeleteDialog(true);
  }, []);

  const onCancelDeleteDialog = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  useEffect(() => {
    if (deleteBlogResponse?.success === true) {
      toast.success(deleteBlogResponse.message);

      const deletedBlog = deleteBlogResponse.data;

      if (deletedBlog) {
        deleteBlogQueryCacheUpdate(deletedBlog);
      }

      setShowDeleteDialog(false);
      return;
    }

    if (deleteBlogResponse?.success === false) {
      toast.error(deleteBlogResponse.message);
      return;
    }
  }, [deleteBlogResponse]);

  return {
    handleSubmit: handleSubmit(submit),
    onShowDeleteDialog,
    onCancelDeleteDialog,
    showDeleteDialog,
    pending,
  };
};

export default useDeleteBlogForm;
