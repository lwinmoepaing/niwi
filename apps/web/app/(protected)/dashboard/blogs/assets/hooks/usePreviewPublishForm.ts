import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const publishFormSchema = z.object({
  title: z.string().min(3),
  subTitle: z.string().min(3),
  slug: z.string().min(3),
  previewImage: z.string(),
});

export type PublishFormValue = z.infer<typeof publishFormSchema>;

const usePreviewPublishForm = () => {
  const [hasHydrate, setHasHydrate] = useState(false);
  const [src] = useState("");

  const form = useForm<PublishFormValue>({
    resolver: zodResolver(publishFormSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      slug: "",
    },
  });

  const dom = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, [hasHydrate]);

  useEffect(() => {
    setHasHydrate(true);
  }, []);

  return {
    hasHydrate,
    src,
    form,
    dom,
  };
};

export default usePreviewPublishForm;
