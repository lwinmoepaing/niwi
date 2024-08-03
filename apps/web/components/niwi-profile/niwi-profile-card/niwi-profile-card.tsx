"use client";

import NiwiTinyTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-tiny-text-editor";
import Button from "@/components/niwi-ui/button/button";
import config from "@/config";
import { onUploadImageAction } from "@/feats/file/actions/image-upload.action";
import { imageUploadSchema } from "@/feats/file/validation/image-upload.validation";
import useProfileSave from "@/feats/profile/hooks/useProfileSave";
import { cn } from "@/libs/utils";
import { UserProfileResponse } from "@/types/profile-response";
import { CircleDashed, CloudIcon, CloudOff, ImageIcon } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, memo, useCallback, useRef, useTransition } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import NiwiProfileLink from "../niwi-profile-link/niwi-profile-link";
import NiwiProfileThinkingDots from "./niwi-profile-thinking-dot";

function NiwiProfileCard({
  authUser,
  user,
  isEditor = false,
  showHeader = false,
}: {
  authUser?: User;
  user: UserProfileResponse;
  isEditor?: boolean;
  showHeader: boolean;
}) {
  const {
    onChangeBackgroundImage,
    onChangeGridProfile,
    onToggleShowStatusMessage,
    onChangeStatusMessage,
    onChangeAboutMeValue,
    handleSubmit,
    loading,
    getValues,
    editorResetKey,
    register,
    watch,
    resetForm,
    isEditing,
    setIsEditing,
    statusMessageJson,
    aboutMeJson,
  } = useProfileSave({
    authUser,
    data: {
      userId: user.id,
      name: user.name,
      shortLink: user.shortLink,
      backgroundImage: user.profile.backgroundImage,
      aboutMe: user.profile.aboutMe,
      aboutMeJson: user.profile.aboutMeJson,
      statusMessage: user.profile.statusMessage,
      statusMessageJson: user.profile.statusMessageJson,
      showStatusMessage: user.profile.showStatusMessage,
      gridProfile: user.profile.gridProfile,
    },
  });
  const imgInputRef = useRef<HTMLInputElement>(null);

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
            if (data?.path) {
              onChangeBackgroundImage(data.path);
            }
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

  const onCancel = useCallback(() => {
    setIsEditing(false);
    resetForm();
  }, [resetForm]);

  return (
    <>
      {showHeader && (
        <h2 className="pb-5">
          <Link
            href="/dashboard/profile"
            className="hover:text-blue-500 transition-all"
          >
            Profile
          </Link>{" "}
          / {user.shortLink}
          {isEditor && (
            <>
              {!isEditing && (
                <Button
                  size={"sm"}
                  className="inline-block ml-2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
              {isEditing && (
                <>
                  <Button
                    variant={"success"}
                    size={"sm"}
                    className="inline-block ml-2"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading && (
                      <CircleDashed className="animate-spin mr-1" size={12} />
                    )}{" "}
                    Save
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="inline-block ml-2"
                    onClick={onCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </>
          )}
        </h2>
      )}

      <div className="flex flex-row gap-[20px]">
        <section className="niwi-profile-card-container">
          <div className="niwi-profile-card-image">
            {watch("backgroundImage") ? (
              <Image
                alt="wallpaper"
                src={watch("backgroundImage")}
                fill
                unoptimized={true}
              />
            ) : (
              <></>
            )}
          </div>

          <div className="absolute right-[6px] top-[6px] flex flex-row gap-x-[6px]">
            {isEditing && (
              <>
                <button
                  type="button"
                  className="editor-side-right-actions-button"
                  onClick={onToggleShowStatusMessage}
                  disabled={loading}
                >
                  {!watch("showStatusMessage") ? (
                    <CloudOff size={16} />
                  ) : (
                    <CloudIcon size={16} />
                  )}
                </button>

                <form action={onUploadImageAction}>
                  <button
                    disabled={loading}
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
          </div>

          <section className="niwi-profile-image-row">
            <div className="niwi-profile-image">
              <Image
                alt="wallpaper"
                src={user?.image || config.defaultUserImage}
                fill
              />
            </div>

            <NiwiProfileThinkingDots
              isShowThinking={watch("showStatusMessage")}
            />

            <span
              className={cn(
                watch("showStatusMessage")
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
                  key={`Thinking_${editorResetKey}`}
                  disabled={!isEditing || loading}
                  placeHolder={isEditing ? "Enter your Thinking !!" : "..."}
                  initializeData={statusMessageJson}
                  onChangeValue={onChangeStatusMessage}
                />
              </div>
            </span>
          </section>

          <section className="niwi-profile-body">
            {isEditing ? (
              <input
                disabled={loading}
                className="niwi-profile-header editor niwi-profile-input"
                placeholder="Enter your name..."
                {...register("name")}
              />
            ) : (
              <h1 className="niwi-profile-header">{watch("name")}</h1>
            )}

            {isEditing ? (
              <input
                disabled={loading}
                className="niwi-profile-sub-header niwi-profile-input editor"
                placeholder="Unique name for sharing..."
                {...register("shortLink")}
              />
            ) : (
              <h1 className="niwi-profile-sub-header">{watch("shortLink")}</h1>
            )}

            <div className="niwi-profile-about-container">
              <h2 className="niwi-profile-sub-header">About me</h2>
              <NiwiTinyTextEditor
                key={`About_${editorResetKey}`}
                disabled={!isEditing || loading}
                placeHolder={isEditing ? "Enter your about !!" : "..."}
                initializeData={aboutMeJson}
                onChangeValue={onChangeAboutMeValue}
              />
            </div>
          </section>
        </section>

        <NiwiProfileLink
          isEditing={isEditing && !loading}
          onChangeGridProfile={onChangeGridProfile}
          defaultData={getValues("gridProfile")}
        />
      </div>
    </>
  );
}
export default memo(NiwiProfileCard);
