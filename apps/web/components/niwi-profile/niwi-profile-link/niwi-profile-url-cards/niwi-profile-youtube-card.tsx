"use client";

import { cn } from "@/libs/utils";
import { LinkCardType } from "../config/niwi-profile-config";
import NiwiProfileYoutubeIcon from "../niwi-profile-icons/niwi-profile-youtube-icon";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

export default function NiwiProfileYoutubeCard({
  item,
}: NiwiProfileLinkItemProps) {
  return (
    <div className="w-full h-full flex flex-1 flex-row items-center gap-x-[10px]">
      <div className={item.size === "square" ? "w-full" : "w-full lg:w-[158px]"}>
        <NiwiProfileYoutubeIcon className="w-[24px] h-[24px] block mx-auto my-1" />
        <h2 className="text-xs text-center">{item.title}</h2>
      </div>

      <div
        className={cn(
          "flex flex-col gap-y-[8px] flex-1 h-full relative pt-[20px] pb-[10px]",
          item.size !== "square" ? "hidden lg:flex" : "hidden"
        )}
      >
        <div
          className={cn(
            "flex-1 justify-center h-full flex-row gap-x-[20px] px-[30px]",
            item.size === "full" ? "flex " : "hidden"
          )}
        >
          {item.youtubeInfo && (
            <div className="bg-[red] text-[12px] text-white flex flex-col flex-1 p-[4px] rounded-[14px] text-center justify-center items-center">
              <span>{item.youtubeInfo.videoCount}</span>
              <span>Videos</span>
            </div>
          )}

          {item.youtubeInfo && (
            <div className="bg-[red] text-[12px] text-white flex flex-col flex-1 p-[4px] rounded-[14px] text-center justify-center items-center">
              <span>{item.youtubeInfo.subscribeCount}</span>
              <span>Subscribers</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex-1 justify-center h-full flex flex-col gap-x-[20px]",
            item.size === "half" ? "pl-0 pr-[10px]" : "px-[30px]"
          )}
        >
          <button
            className={cn(
              "bg-[red] text-white rounded-full text-xs",
              item.size === "half" ? "py-[6px]" : "py-[10px]"
            )}
          >
            {item.size === "half" ? "Subscribe" : "Subscribe now"}
          </button>
        </div>
      </div>
    </div>
  );
}
