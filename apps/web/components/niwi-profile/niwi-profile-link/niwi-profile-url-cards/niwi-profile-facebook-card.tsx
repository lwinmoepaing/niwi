"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import { LinkCardType } from "../config/niwi-profile-config";
import NiwiProfileFacebookIcon from "../niwi-profile-icons/niwi-profile-facebook-icon";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

export default function NiwiProfileFacebookCard({
  item,
}: NiwiProfileLinkItemProps) {
  return (
    <div
      className={cn("w-full h-full flex flex-1 flex-row items-center relative")}
    >
      <div className={item.size === "square" ? "w-full" : "w-full lg:w-[158px]"}>
        <NiwiProfileFacebookIcon className="w-[24px] h-[24px] block mx-auto my-1" />
        <h2 className="text-xs text-center">{item.title}</h2>
      </div>

      <div
        className={cn("flex-1 h-full", item.size === "square" ? "hidden" : "hidden lg:flex")}
      >
        <div className="w-full h-full relative overflow-hidden py-[20px] px-[20px]">
          <div className="bg-[#4a66a0] rounded-[20px] w-full h-full relative flex justify-center items-center">
            <Image
              className="w-[120px] h-auto object-cover rounded-[20px] bg-[#4a66a0]"
              src="/images/profile/facebook.gif"
              alt="Facebook"
              width={200}
              height={78}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
