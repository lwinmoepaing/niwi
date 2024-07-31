"use client";

import { LinkCardType } from "./config/niwi-profile-config";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

function NiwiProfileLinkItem({ item }: NiwiProfileLinkItemProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {item.type}
    </div>
  );
}
export default NiwiProfileLinkItem;
