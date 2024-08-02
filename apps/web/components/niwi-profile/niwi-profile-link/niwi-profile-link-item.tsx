"use client";

import { LinkCardType } from "./config/niwi-profile-config";
import NiwiProfileGithubCard from "./niwi-profile-url-cards/niwi-profile-github-card";
import NiwiProfileYoutubeCard from "./niwi-profile-url-cards/niwi-profile-youtube-card";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

function NiwiProfileLinkItem({ item }: NiwiProfileLinkItemProps) {
  return (
    <div className="w-full h-full">
      {item.type === "github" && <NiwiProfileGithubCard item={item} />}
      {item.type === "youtube" && <NiwiProfileYoutubeCard item={item} />}
    </div>
  );
}

export default NiwiProfileLinkItem;
