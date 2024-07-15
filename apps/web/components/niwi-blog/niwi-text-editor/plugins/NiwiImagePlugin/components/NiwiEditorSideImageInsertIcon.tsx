"use client";

import { onUploadImageAction } from "@/feats/file/actions/image-upload.action";
import { imageUploadSchema } from "@/feats/file/validation/image-upload.validation";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CircleDashed, Image } from "lucide-react";
import { ChangeEvent, useCallback, useRef, useTransition } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { INSERT_NIWI_IMAGE_COMMAND } from "../NiwiImagePlugin";

function NiwiEditorSideImageInsertIcon() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [editor] = useLexicalComposerContext();

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const isImageExist = files !== null && !!files && !!files?.[0];
    if (!isImageExist) return;

    const file = files[0];
    try {
      imageUploadSchema.parse({ image: file });

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        startTransition(async () => {
          try {
            const { success, data, message } =
              await onUploadImageAction(formData);
            if (!success) toast.error(message);

            editor.dispatchCommand(INSERT_NIWI_IMAGE_COMMAND, {
              src: data?.path || "",
              imgSize: "fitWidth",
              altText: "",
            });
            
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            }
          }
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        let message = "";
        error.errors.forEach((err) => {
          console.error(err.message);
          message += err.message + ",";
        });
        toast.error(message);
      }
    }

    if (fileInputRef.current?.value) {
      fileInputRef.current.value = "";
    }
  }, []);

  return (
    <>
      <form action={onUploadImageAction} ref={formRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef?.current?.click();
          }}
          className="editor-side-right-actions-button"
          type="button"
        >
          {isPending ? (
            <CircleDashed size={20} className="animate-spin" />
          ) : (
            <Image size={20} />
          )}
        </button>
        <input type="file" onChange={onInputChange} ref={fileInputRef} hidden />
      </form>
    </>
  );
}
export default NiwiEditorSideImageInsertIcon;
