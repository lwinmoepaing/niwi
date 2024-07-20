"use client";
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
import { XIcon } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import usePreviewPublishForm from "../hooks/usePreviewPublishForm";
import { memo } from "react";
import config from "@/config";
import Button from "@/components/niwi-ui/button/button";

type PreviewPublishModalProps = {
  show: boolean;
  onClose: () => void;
};

function PreviewPublishModal({ show, onClose }: PreviewPublishModalProps) {
  const { dom, src, hasHydrate, form } = usePreviewPublishForm();

  if (!hasHydrate || !dom) return null;

  return createPortal(
    <div
      className={cn(
        "niwi-blog-publish-preview-modal",
        show ? "active" : "inactive"
      )}
    >
      <form
        className=""
        // action={}
      >
        <Form {...form}>
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
                      Include a high-quality image in your story to make it more
                      inviting to readers.
                    </p>
                  )}
                  {src && (
                    <Image
                      className={cn("niwi-blog-image")}
                      src={src || ""}
                      alt={""}
                      width={800}
                      height={600}
                    />
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
                          type="email"
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preview Sub-title</FormLabel>
                      <FormControl>
                        <TextInput
                          type="email"
                          placeholder="Write a preview subtitle ..."
                          // disabled={pending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <TextInput
                          type="text"
                          placeholder="Write a preview text"
                          // disabled={pending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[12px] ml-1">
                        {config.domainUrl}/blogs/{field.value}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" variant={"success"} className="mt-4">
                  Publish now
                </Button>
              </section>
            </div>
          </div>
        </Form>
      </form>
    </div>,
    dom
  );
}
export default memo(PreviewPublishModal);
