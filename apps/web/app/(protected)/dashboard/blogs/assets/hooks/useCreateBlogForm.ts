import { createBlogAction } from "@/feats/blog/actions/blog.action";
import {
  CreateBlogFormValues,
  createBlogSchema,
} from "@/feats/blog/validations/blog.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const defaultValues = {
  title: "-",
  content: "",
  contentJson: "",
};

const useCreateBlogForm = () => {
  const router = useRouter();

  const [editorResetKey, setEditorResetKey] = useState(() => nanoid());

  const [createBlogResponse, dispatchCreateBlog, pending] = useActionState(
    createBlogAction,
    undefined
  );

  const [plainText, setPlainText] = useState("");

  const { handleSubmit, setValue, reset } = useForm<CreateBlogFormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues,
  });

  const submit = useCallback(
    async (values: CreateBlogFormValues) => {
      dispatchCreateBlog(values);
    },
    [dispatchCreateBlog]
  );

  const resetForm = useCallback(() => {
    reset(defaultValues, { keepDefaultValues: false });
    setEditorResetKey(nanoid());
  }, []);

  useEffect(() => {
    if (createBlogResponse?.success === true) {
      toast.success(createBlogResponse.message);
      const blogId = createBlogResponse.data?.newBlog.id;
      router.push(`/dashboard/blogs/${blogId}`);
      resetForm();
      return;
    }

    if (createBlogResponse?.success === false) {
      toast.error(createBlogResponse.message);
      return;
    }
  }, [createBlogResponse, resetForm]);

  const onChangeValue = useCallback(
    (html: string, json: string, text: string) => {
      setValue("content", html);
      setValue("contentJson", json);
      setPlainText(text);
    },
    []
  );

  const isValidForm = useMemo(() => {
    return plainText.trim().length !== 0;
  }, [plainText]);

  return {
    onChangeValue,
    handleSubmit: handleSubmit(submit),
    pending,
    createBlogResponse,
    editorResetKey,
    resetForm,
    isValidForm,
  };
};

export default useCreateBlogForm;
