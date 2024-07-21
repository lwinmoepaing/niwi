import { getPlainTextFromNode } from "@/components/niwi-blog/niwi-text-editor/editor-utils/editor-text-node-helper";
import { saveBlogAction } from "@/feats/blog/actions/blog.action";
import {
  SaveBlogFormValues,
  saveBlogSchema,
} from "@/feats/blog/validations/blog.validation";
import { EditorRootJson } from "@/types/editor-json";
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

function getExtractText(strArray: string[]): [string, string] {
  // Filter out empty strings
  const nonEmptyStrings = strArray.filter((str) => str.trim() !== "");

  // Get the first two non-empty strings
  const title = nonEmptyStrings[0] || "";
  const subTitle = nonEmptyStrings[1] || "";

  return [title, subTitle];
}

const useEditBlogForm = ({
  blogId,
  contentJson,
  content,
  publishStatus,
  slug,
}: {
  blogId: string;
  contentJson: string;
  content: string;
  publishStatus: boolean;
  slug: string;
}) => {
  const [editorResetKey] = useState(() => nanoid());

  const [saveBlogResponse, dispatchSaveBlog, savePending] = useActionState(
    saveBlogAction,
    undefined
  );

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Editor Text
  const [plainText, setPlainText] = useState("");
  const [title, setTitle] = useState<string>("");
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

      const imageList: string[] = [];
      const parseJson = JSON.parse(json) as EditorRootJson;
      const textList: string[] = [];
      parseJson.root.children.forEach((child) => {
        if (child.type === "Niwi-Image-Container" && child.src) {
          imageList.push(child.src);
        }
        textList.push(getPlainTextFromNode(child));
      });

      const [getTitle, getSubTitle] = getExtractText(textList);

      setTitle(getTitle?.trim());
      setSubTitle(getSubTitle?.trim());
      setImages(imageList);
      setPlainText(text);
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
