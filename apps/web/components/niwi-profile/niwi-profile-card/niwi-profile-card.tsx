"use client";

import NiwiTinyTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-tiny-text-editor";
import config from "@/config";
import { onUploadImageAction } from "@/feats/file/actions/image-upload.action";
import { imageUploadSchema } from "@/feats/file/validation/image-upload.validation";
import { cn } from "@/libs/utils";
import {
  CircleDashed,
  CloudIcon,
  CloudOff,
  Edit2,
  ImageIcon,
  X,
} from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import NiwiProfileLink from "../niwi-profile-link/niwi-profile-link";

function NiwiProfileCard({
  user,
  isEditor = false,
}: {
  user?: User;
  isEditor?: boolean;
}) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(isEditor);

  const [option, setOption] = useState({
    backgroundImage: "/images/profile/sample.gif",
    isShowThinking: false,
  });

  const toggleEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const toggleShowThinking = useCallback(() => {
    setOption((prev) => ({ ...prev, isShowThinking: !prev.isShowThinking }));
  }, []);

  const [isPending, startTransition] = useTransition();

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
            if (data?.path)
              setOption((prev) => ({ ...prev, backgroundImage: data?.path }));
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
    if (imgInputRef.current?.value) {
      imgInputRef.current.value = "";
    }
  }, []);

  return (
    <div className="flex flex-row gap-[20px]">
      <section className="niwi-profile-card-container">
        <div className="niwi-profile-card-image">
          <Image alt="wallpaper" src={option.backgroundImage} fill />
        </div>

        <div className="absolute right-[6px] top-[6px] flex flex-row gap-x-[6px]">
          {isEditing && (
            <>
              <button
                type="button"
                className="editor-side-right-actions-button"
                onClick={toggleShowThinking}
              >
                {!option.isShowThinking ? (
                  <CloudOff size={16} />
                ) : (
                  <CloudIcon size={16} />
                )}
              </button>

              <form action={onUploadImageAction}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    imgInputRef?.current?.click();
                  }}
                  className="editor-side-right-actions-button"
                  type="button"
                >
                  {isPending ? (
                    <CircleDashed size={20} className="animate-spin" />
                  ) : (
                    <ImageIcon size={20} />
                  )}
                </button>
                <input
                  type="file"
                  onChange={onInputChange}
                  ref={imgInputRef}
                  hidden
                  className="hidden"
                />
              </form>
            </>
          )}
          <button
            type="button"
            className="editor-side-right-actions-button"
            onClick={toggleEditing}
          >
            {isEditing ? <X size={15} /> : <Edit2 size={15} />}
          </button>
        </div>

        <section className="niwi-profile-image-row">
          <div className="niwi-profile-image">
            <Image
              alt="wallpaper"
              src={user?.image || config.defaultUserImage}
              fill
            />
          </div>

          <span
            className={cn(
              option.isShowThinking
                ? "niwi-profile-active"
                : "niwi-profile-inactive"
            )}
          >
            <div
              className={cn(
                "niwi-profile-thinking-dot-color niwi-profile-thinking-dot-1"
              )}
            />
          </span>
          <span
            className={cn(
              option.isShowThinking
                ? "niwi-profile-active"
                : "niwi-profile-inactive"
            )}
          >
            <div
              className={cn(
                "niwi-profile-thinking-dot-color niwi-profile-thinking-dot-2"
              )}
            />
          </span>
          <span
            className={cn(
              option.isShowThinking
                ? "niwi-profile-active"
                : "niwi-profile-inactive"
            )}
          >
            <div
              className={cn(
                "niwi-profile-thinking-dot-color niwi-profile-thinking-dot-3"
              )}
            />
          </span>

          <span
            className={cn(
              option.isShowThinking
                ? "niwi-profile-active"
                : "niwi-profile-inactive"
            )}
          >
            <div
              className={cn(
                "niwi-profile-thinking-dot-color niwi-profile-thinking-box"
              )}
            >
              <NiwiTinyTextEditor
                disabled={!isEditing}
                placeHolder={isEditing ? "Enter your Thinking !!" : "..."}
              />
            </div>
          </span>
        </section>

        <section className="niwi-profile-body">
          {isEditing ? (
            <input
              className="niwi-profile-header editor niwi-profile-input"
              placeholder="Enter your name..."
              value={user?.name || ""}
              onChange={() => {}}
            />
          ) : (
            <h1 className="niwi-profile-header"> {user?.name || ""} </h1>
          )}

          {isEditing ? (
            <input
              className="niwi-profile-sub-header niwi-profile-input editor"
              placeholder="Unique name for sharing..."
              value={user?.shortLink || ""}
              onChange={() => {}}
            />
          ) : (
            <h1 className="niwi-profile-sub-header">
              {" "}
              {user?.shortLink || ""}{" "}
            </h1>
          )}

          <div className="niwi-profile-about-container">
            <h2 className="niwi-profile-sub-header">About me</h2>
            <NiwiTinyTextEditor
              disabled={!isEditing}
              placeHolder={isEditing ? "Enter your about !!" : "..."}
            />
          </div>
        </section>
      </section>

      <NiwiProfileLink />
    </div>
  );
}
export default NiwiProfileCard;
