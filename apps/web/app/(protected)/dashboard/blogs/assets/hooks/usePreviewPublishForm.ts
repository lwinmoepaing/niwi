import { publishBlogAction } from "@/feats/blog/actions/blog.action";
import { publishBlogQueryCacheUpdate } from "@/feats/blog/services/blog-query-cache.service";
import {
  PublishBlogFormValues,
  publishBlogSchema,
} from "@/feats/blog/validations/blog.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type UsePreviewPublishFormProps = {
  title: string;
  subTitle: string;
  images: string[];
  blogId: string;
  onSuccess: (blogSlug: string) => void;
};

const usePreviewPublishForm = ({
  title,
  subTitle,
  blogId,
  images,
  onSuccess,
}: UsePreviewPublishFormProps) => {
  const [hasHydrate, setHasHydrate] = useState(false);

  const [publishResponse, dispatchPublishBlog, pending] = useActionState(
    publishBlogAction,
    undefined
  );

  const [showPhotoChanger, setShowPohtoChanger] = useState(false);

  const [suggestSlug, setSuggestSlug] = useState("");

  const form = useForm<PublishBlogFormValues>({
    resolver: zodResolver(publishBlogSchema),
    defaultValues: {
      title,
      subTitle,
      slug: "",
      isPublish: true,
      blogId,
      previewImage: images.length > 0 ? images[0] || "" : "",
    },
  });

  const onSetImage = useCallback(
    (image: string) => {
      form.setValue("previewImage", image);
    },
    [form?.setValue]
  );

  const submit = useCallback(
    async (values: PublishBlogFormValues) => {
      dispatchPublishBlog({ ...values });
    },
    [dispatchPublishBlog]
  );

  const dom = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, [hasHydrate]);

  const openPhotoChanger = useCallback(() => {
    setShowPohtoChanger(true);
  }, []);

  const updatePhoto = useCallback((img: string) => {
    form.setValue("previewImage", img);
    setShowPohtoChanger(false);
  }, []);

  const onSuggestClick = useCallback(() => {
    form.setValue("slug", suggestSlug);
    setSuggestSlug("");
  }, [suggestSlug, form.setValue]);

  const emptySuggest = useCallback(() => setSuggestSlug(""), []);

  useEffect(() => {
    form.setValue("title", title?.trim());
    form.setValue("subTitle", subTitle?.trim());
    const img = images.length > 0 ? images[0] || "" : "";
    form.setValue("previewImage", img);
    form.setValue("slug", title?.toLowerCase().replace(/\s+/g, "-"));
    setSuggestSlug("");
  }, [form.setValue, title, subTitle, images]);

  useEffect(() => {
    setHasHydrate(true);
  }, []);

  useEffect(() => {
    if (publishResponse?.success === true) {
      toast.success(publishResponse.message);
      onSuccess?.(form.getValues("slug"));

      if (publishResponse.data) {
        publishBlogQueryCacheUpdate(publishResponse.data);
      }
      return;
    }

    if (publishResponse?.success === false) {
      toast.error(publishResponse.message);
      const suggest = publishResponse.errors.suggest as string;
      if (suggest) {
        setSuggestSlug(suggest);
      }
      return;
    }
  }, [publishResponse, onSuccess, form.getValues]);

  return {
    form,
    pending,
    submit,
    hasHydrate,
    showPhotoChanger,
    onSetImage,
    openPhotoChanger,
    onSuggestClick,
    updatePhoto,
    emptySuggest,
    suggestSlug,
    dom,
  };
};

export default usePreviewPublishForm;
