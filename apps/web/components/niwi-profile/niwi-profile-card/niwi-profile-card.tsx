"use client";

import NiwiTinyTextEditor from "@/components/niwi-blog/niwi-text-editor/niwi-tiny-text-editor";
import config from "@/config";
import { cn } from "@/libs/utils";
import { CloudIcon, CloudOff, Edit2, ImageIcon, X } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import { useCallback, useState } from "react";

function NiwiProfileCard({
  user,
  isEditor = false,
}: {
  user?: User;
  isEditor?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(isEditor);

  const [option, setOption] = useState({
    backgroundImage: "",
    isShowThinking: false,
  });

  const toggleEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const toggleShowThinking = useCallback(() => {
    setOption((prev) => ({ ...prev, isShowThinking: !prev.isShowThinking }));
  }, []);

  return (
    <section className="niwi-profile-card-container">
      <div className="niwi-profile-card-image">
        <Image alt="wallpaper" src="/images/profile/sample.gif" fill />
      </div>

      <div className="absolute right-[6px] top-[6px] flex flex-row gap-x-[6px]">
        {isEditing && (
          <>
            <button
              type="button"
              className="bg-[#1d1f23] rounded-full w-[30px] h-[30px] flex justify-center items-center"
              onClick={toggleShowThinking}
            >
              {!option.isShowThinking ? (
                <CloudOff size={16} />
              ) : (
                <CloudIcon size={16} />
              )}
            </button>
            <button
              type="button"
              className="bg-[#1d1f23] rounded-full w-[30px] h-[30px] flex justify-center items-center"
              onClick={() => {}}
            >
              <ImageIcon size={16} />
            </button>
          </>
        )}
        <button
          type="button"
          className="bg-[#1d1f23] rounded-full w-[30px] h-[30px] flex justify-center items-center"
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
          <h1 className="niwi-profile-sub-header"> {user?.shortLink || ""} </h1>
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
  );
}
export default NiwiProfileCard;
