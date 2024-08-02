"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import { LinkCardType } from "../config/niwi-profile-config";
import NiwiProfileBuyMeACoffeeIcon from "../niwi-profile-icons/niwi-profile-buy-me-a-coffee-icon";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

export default function NiwiProfileBuyMeACoffeeCard({
  item,
}: NiwiProfileLinkItemProps) {
  return (
    <div
      className={cn("w-full h-full flex flex-1 flex-row items-center relative")}
    >
      <div className={item.size === "square" ? "w-full" : "min-w-[158px]"}>
        <NiwiProfileBuyMeACoffeeIcon className="w-[24px] h-[24px] block mx-auto my-1" />
        <h2 className="text-xs text-center">{item.title}</h2>
      </div>

      <div
        className={cn("w-full h-full", item.size === "square" ? "hidden" : "")}
      >
        <div className="w-full h-full relative overflow-hidden py-[14px] px-[20px]">
          <div className="bg-[#f4f4f5] dark:bg-black rounded-[20px] w-full h-full relative flex justify-center items-center">
            {item.size === "half" ? (
              <Image
                className="w-[30px] h-auto object-cover rounded-[20px] bg-[#f4f4f5] dark:bg-black"
                src="/images/profile/buy-me-a-coffee-tiny.webp"
                alt="Buy Me A Coffee"
                width={30}
                height={30}
              />
            ) : (
              <Image
                className="w-[200px] h-auto object-cover rounded-[20px] bg-[#f4f4f5] dark:bg-black"
                src="/images/profile/buy-me-a-coffee.webp"
                alt="Buy Me A Coffee"
                width={200}
                height={78}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
