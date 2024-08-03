"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import { LinkCardType } from "../config/niwi-profile-config";
import NiwiProfileInstagramIcon from "../niwi-profile-icons/niwi-profile-instagram-icon";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

export default function NiwiProfileInstagramCard({
  item,
}: NiwiProfileLinkItemProps) {
  return (
    <div
      className={cn("w-full h-full flex flex-1 flex-row items-center relative")}
    >
      <div className={item.size === "square" ? "w-full" : "min-w-[158px]"}>
        <NiwiProfileInstagramIcon className="w-[24px] h-[24px] block mx-auto my-1" />
        <h2 className="text-xs text-center">{item.title}</h2>
      </div>

      <div
        className={cn("w-full h-full", item.size === "square" ? "hidden" : "")}
      >
        <div className="w-full h-full relative overflow-hidden py-[20px] px-[20px]">
          <div className="niwi-instagram-animation rounded-[20px] w-full h-full relative flex justify-center items-center">
            <Image
              className="w-[160px] h-auto object-cover rounded-[20px] bg-[#4a66a0]"
              src="/images/profile/instagram.gif"
              alt="Instagram"
              width={200}
              height={78}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
