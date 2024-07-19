import { createBlogAction } from "@/feats/blog/actions/blog.action";
import {
  CreateBlogFormValues,
  createBlogSchema,
} from "@/feats/blog/validations/blog.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useCreateBlogForm = () => {
  const router = useRouter();
  const [createBlogResponse, dispatchCreateBlog, pending] = useActionState(
    createBlogAction,
    undefined
  );

  const { handleSubmit, setValue, watch } = useForm<CreateBlogFormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "-",
      content: "",
    },
  });

  const submit = useCallback(
    async (values: CreateBlogFormValues) => {
      dispatchCreateBlog(values);
    },
    [dispatchCreateBlog]
  );

  useEffect(() => {
    if (createBlogResponse?.success === true) {
      toast.success(createBlogResponse.message);
      const blogId = createBlogResponse.data?.newBlog.id;
      router.push(`/dashboard/blogs/${blogId}`);
      return;
    }

    if (createBlogResponse?.success === false) {
      toast.error(createBlogResponse.message);
      return;
    }
  }, [createBlogResponse]);

  const onChangeValue = useCallback((html: string, json: string) => {
    setValue("content", html);
    setValue("contentJson", json);
  }, []);

  return {
    onChangeValue,
    handleSubmit: handleSubmit(submit),
    pending,
    createBlogResponse,
    htmlText: watch("content"),
  };
};

export default useCreateBlogForm;
