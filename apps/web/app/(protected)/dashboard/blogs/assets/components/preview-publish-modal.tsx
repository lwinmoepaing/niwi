"use client";
import Button from "@/components/niwi-ui/button/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/niwi-ui/form/form";
import TextInput from "@/components/niwi-ui/form/text-input";
import { cn } from "@/libs/utils";
import { CircleDashed, XIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import { createPortal } from "react-dom";
import usePreviewPublishForm from "../hooks/usePreviewPublishForm";
import config from "@/config";

type PreviewPublishModalProps = {
  show: boolean;
  title: string;
  subTitle: string;
  images: string[];
  blogId: string;
  onSuccess: () => void;
  onClose: () => void;
};

function PreviewPublishModal({
  show,
  onClose,
  title,
  subTitle,
  images,
  blogId,
  onSuccess,
}: PreviewPublishModalProps) {
  const {
    dom,
    hasHydrate,
    pending,
    showPhotoChanger,
    openPhotoChanger,
    submit,
    updatePhoto,
    form,
  } = usePreviewPublishForm({
    title,
    subTitle,
    onSuccess,
    images,
    blogId,
  });

  if (!hasHydrate || !dom) return null;

  const src = form?.watch("previewImage");

  return createPortal(
    <div
      className={cn(
        "niwi-blog-publish-preview-modal",
        show ? "active" : "inactive"
      )}
    >
      <Form {...form}>
        <form className="" action={() => form.handleSubmit(submit)()}>
          <div className="content">
            <div className="close-icon" onClick={onClose}>
              <XIcon />
            </div>

            <div className="section-wrapper">
              {/* Image Box */}
              <section className="section">
                <h2 className="mb-2 font-bold">Blog Preview</h2>

                <div className="niwi-blog-image-container">
                  {!src && (
                    <p className="niwi-blog-image-empty-text">
                      Include a high-quality image in your blog to make it more
                      inviting to readers.
                    </p>
                  )}

                  {src && (
                    <>
                      {!showPhotoChanger ? (
                        <div className="w-full h-full relative flex justify-center items-center">
                          <Image
                            className={cn("niwi-blog-image")}
                            src={src || ""}
                            alt={""}
                            fill
                          />
                          <button
                            className="niwi-blog-preview-button"
                            type="button"
                            onClick={openPhotoChanger}
                          >
                            Change Preview Image
                          </button>
                        </div>
                      ) : (
                        <div className="niwi-blog-preview-photo-changer-container">
                          {images.map((item) => (
                            <div
                              className="item"
                              key={item}
                              onClick={() => updatePhoto(item)}
                            >
                              <div className="item-img">
                                <Image
                                  className={cn("niwi-blog-image")}
                                  src={item}
                                  alt={title}
                                  fill
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preview Title</FormLabel>
                      <FormControl>
                        <TextInput
                          type="text"
                          placeholder="Write a preview text"
                          // disabled={pending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preview Sub-title</FormLabel>
                      <FormControl>
                        <TextInput
                          type="text"
                          placeholder="Write a preview subtitle ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*

                 */}
                <p className="mt-2 text-sm">
                  <strong>Note</strong>: Changes here will affect to your
                  preview card UI and SEO.
                </p>
              </section>
              {/* Slug Box */}
              <section className="section">
                <h2 className="mb-2">Publishing</h2>

                <p className="text-sm mb-4">
                  Please choose slug or auto generated. A slug is the part of a
                  URL that identifies a particular page on a website in an
                  easy-to-read form
                </p>

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <TextInput
                          type="text"
                          placeholder="Write a preview text"
                          // disabled={pending}
                          {...field}
                          // disabled={pending}
                          onChange={(e) => {
                            const value = e.target.value;
                            console.log(value);
                            field.onChange(
                              e.target.value?.toLowerCase().replace(/\s+/g, "-")
                            );
                          }}
                        />
                      </FormControl>
                      {formState.errors.slug?.message ? null : (
                        <FormDescription className="text-[12px] ml-1">
                          Preview:{" "}
                          <strong>
                            {config.domainUrl}/blogs/
                            {field.value.toLowerCase().replace(/\s+/g, "-")}
                          </strong>
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant={"success"} className="mt-4">
                  {pending ? (
                    <CircleDashed className="animate-spin" />
                  ) : (
                    "Publish now"
                  )}
                </Button>
              </section>
            </div>
          </div>
        </form>
      </Form>
    </div>,
    dom
  );
}
export default memo(PreviewPublishModal);
