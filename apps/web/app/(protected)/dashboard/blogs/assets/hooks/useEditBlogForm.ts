import { saveBlogAction } from "@/feats/blog/actions/blog.action";
import {
  SaveBlogFormValues,
  saveBlogSchema,
} from "@/feats/blog/validations/blog.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useEditBlogForm = ({
  blogId,
  contentJson,
  content,
  publishStatus,
}: {
  blogId: string;
  contentJson: string;
  content: string;
  publishStatus: boolean;
}) => {
  const [editorResetKey] = useState(() => nanoid());

  const [saveBlogResponse, dispatchSaveBlog, savePending] = useActionState(
    saveBlogAction,
    undefined
  );

  const [showPreviewModal, setShowPreviewModal] = useState(true);

  const [plainText, setPlainText] = useState("");

  const [isPublished, setIsPublished] = useState(publishStatus);

  const {
    handleSubmit,
    setValue,
    formState: { isValid, isDirty },
    reset,
  } = useForm<SaveBlogFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(saveBlogSchema),
    defaultValues: {
      blogId,
      content,
      contentJson,
    },
  });

  const submit = useCallback(
    async (values: SaveBlogFormValues) => {
      dispatchSaveBlog(values);
    },
    [dispatchSaveBlog]
  );

  useEffect(() => {
    if (saveBlogResponse?.success === true) {
      toast.success(saveBlogResponse.message);

      if (saveBlogResponse.data) {
        reset(
          {
            blogId,
            content: saveBlogResponse.data.content,
            contentJson: saveBlogResponse.data.contentJson,
          },
          { keepDefaultValues: false }
        );

        setIsPublished(saveBlogResponse.data.isPublished);
      }
      return;
    }

    if (saveBlogResponse?.success === false) {
      toast.error(saveBlogResponse.message);
      return;
    }
  }, [saveBlogResponse]);

  const onChangeValue = useCallback(
    (html: string, json: string, text: string) => {
      setValue("content", html, { shouldDirty: true });
      setValue("contentJson", json, { shouldDirty: true });
      setPlainText(text);
    },
    []
  );

  const togglePreviewModal = useCallback(
    () => setShowPreviewModal((prev) => !prev),
    []
  );

  const isValidForm = useMemo<boolean>(() => {
    return plainText.trim().length !== 0 && isDirty && isValid;
  }, [plainText, isDirty, isValid]);

  const isValidPublish = useMemo<boolean>(() => {
    return !isValidForm && !isPublished && plainText.trim().length !== 0;
  }, [isValidForm, isPublished, plainText]);

  return {
    onChangeValue,
    handleSubmit: handleSubmit(submit),
    showPreviewModal,
    togglePreviewModal,
    editorResetKey,
    savePending,
    saveBlogResponse,
    isValidForm,
    isValidPublish,
  };
};

export default useEditBlogForm;
