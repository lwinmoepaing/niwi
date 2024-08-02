"use client";

import { LinkCardType } from "./config/niwi-profile-config";
import NiwiProfileBuyMeACoffeeCard from "./niwi-profile-url-cards/niwi-profile-buy-me-a-coffee-card";
import NiwiProfileGithubCard from "./niwi-profile-url-cards/niwi-profile-github-card";
import NiwiProfileSportifyCard from "./niwi-profile-url-cards/niwi-profile-sportify-card";
import NiwiProfileYoutubeCard from "./niwi-profile-url-cards/niwi-profile-youtube-card";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

function NiwiProfileLinkItem({ item }: NiwiProfileLinkItemProps) {
  return (
    <div className="w-full h-full">
      {item.type === "github" && <NiwiProfileGithubCard item={item} />}
      {item.type === "youtube" && <NiwiProfileYoutubeCard item={item} />}
      {item.type === "sportify" && <NiwiProfileSportifyCard item={item} />}
      {item.type === "buymecoffee" && (
        <NiwiProfileBuyMeACoffeeCard item={item} />
      )}
    </div>
  );
}

export default NiwiProfileLinkItem;
