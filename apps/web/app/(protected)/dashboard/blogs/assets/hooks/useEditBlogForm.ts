import { saveBlogAction } from "@/feats/blog/actions/blog.action";
import { updateBlogQueryCacheUpdate } from "@/feats/blog/services/blog-query-cache.service";
import {
  SaveBlogFormValues,
  saveBlogSchema,
} from "@/feats/blog/validations/blog.validation";
import { getExtractNodeFromEditor } from "@/libs/editor/getExtractNodeFromEditor";
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
  slug,
  title: parentTitle,
}: {
  blogId: string;
  contentJson: string;
  content: string;
  publishStatus: boolean;
  slug: string;
  title: string;
}) => {
  const [editorResetKey] = useState(() => nanoid());

  const [saveBlogResponse, dispatchSaveBlog, savePending] = useActionState(
    saveBlogAction,
    undefined
  );

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Editor Text
  const [plainText, setPlainText] = useState("");
  const [title, setTitle] = useState<string>(
    parentTitle === "-" ? "" : parentTitle
  );
  const [subTitle, setSubTitle] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [slugName, setSlugName] = useState<string>(slug);
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
      title: "-",
      blogId,
      content,
      contentJson,
    },
  });

  const submit = useCallback(
    async (values: SaveBlogFormValues) => {
      dispatchSaveBlog({ ...values, title });
    },
    [dispatchSaveBlog, title]
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

        updateBlogQueryCacheUpdate(saveBlogResponse.data);

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
      setPlainText(text);
      setValue("content", html, { shouldDirty: true });
      setValue("contentJson", json, { shouldDirty: true });

      const [getTitle, getSubTitle, imageList] = getExtractNodeFromEditor(json);
      // setValue("title", getTitle?.trim(), { shouldDirty: true });
      setTitle(getTitle?.trim());
      setSubTitle(getSubTitle?.trim());
      setImages(imageList);
    },
    []
  );

  const togglePreviewModal = useCallback(
    () => setShowPreviewModal((prev) => !prev),
    []
  );

  const handleOnPublishingSuccess = useCallback((slug: string) => {
    setShowPreviewModal(false);
    setIsPublished(true);
    setSlugName(slug);
  }, []);

  const isValidForm = useMemo<boolean>(() => {
    return plainText.trim().length !== 0 && isDirty && isValid;
  }, [plainText, isDirty, isValid]);

  const isValidPublish = useMemo<boolean>(() => {
    return !isValidForm && !isPublished && plainText.trim().length !== 0;
  }, [isValidForm, isPublished, plainText]);

  return {
    onChangeValue,
    handleOnPublishingSuccess,
    handleSubmit: handleSubmit(submit),
    showPreviewModal,
    togglePreviewModal,
    editorResetKey,
    savePending,
    saveBlogResponse,
    isValidForm,
    isValidPublish,
    isPublished,
    title,
    subTitle,
    images,
    slugName,
  };
};

export default useEditBlogForm;
