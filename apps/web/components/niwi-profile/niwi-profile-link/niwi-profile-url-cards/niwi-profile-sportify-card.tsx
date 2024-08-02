"use client";

import { cn } from "@/libs/utils";
import { LinkCardType } from "../config/niwi-profile-config";
import NiwiProfileSportifyIcon from "../niwi-profile-icons/niwi-profile-sportify-icon";
import Image from "next/image";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

export default function NiwiProfileSportifyCard({
  item,
}: NiwiProfileLinkItemProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-1 flex-row items-center relative",
      )}
    >
      <div className={item.size === "square" ? "w-full" : "min-w-[158px]"}>
        <NiwiProfileSportifyIcon className="w-[24px] h-[24px] block mx-auto my-1" />
        <h2 className="text-xs text-center">{item.title}</h2>
      </div>

      <div
        className={cn("w-full h-full", item.size === "square" ? "hidden" : "")}
      >
        <div className="w-full h-full relative overflow-hidden py-[14px] px-[20px]">
          <Image
            className="w-full h-full object-cover rounded-[20px]"
            src="/images/profile/sportify-gif.gif"
            alt="Sportify"
            width={300}
            height={225}
          />
        </div>
      </div>
    </div>
  );
}
