"use client";

import { LinkCardType } from "./config/niwi-profile-config";
import NiwiProfileBuyMeACoffeeCard from "./niwi-profile-url-cards/niwi-profile-buy-me-a-coffee-card";
import NiwiProfileFacebookCard from "./niwi-profile-url-cards/niwi-profile-facebook-card";
import NiwiProfileGithubCard from "./niwi-profile-url-cards/niwi-profile-github-card";
import NiwiProfileInstagramCard from "./niwi-profile-url-cards/niwi-profile-instagram-card";
import NiwiProfileSpotifyCard from "./niwi-profile-url-cards/niwi-profile-spotify-card";
import NiwiProfileTwitterCard from "./niwi-profile-url-cards/niwi-profile-twitter-card";
import NiwiProfileYoutubeCard from "./niwi-profile-url-cards/niwi-profile-youtube-card";

type NiwiProfileLinkItemProps = {
  item: LinkCardType;
};

function NiwiProfileLinkItem({ item }: NiwiProfileLinkItemProps) {
  return (
    <div className="w-full h-full">
      {item.type === "github" && <NiwiProfileGithubCard item={item} />}
      {item.type === "youtube" && <NiwiProfileYoutubeCard item={item} />}
      {item.type === "spotify" && <NiwiProfileSpotifyCard item={item} />}
      {item.type === "facebook" && <NiwiProfileFacebookCard item={item} />}
      {item.type === "twitter" && <NiwiProfileTwitterCard item={item} />}
      {item.type === "instagram" && <NiwiProfileInstagramCard item={item} />}
      {item.type === "buymecoffee" && (
        <NiwiProfileBuyMeACoffeeCard item={item} />
      )}
    </div>
  );
}

export default NiwiProfileLinkItem;
