"use client";

import { updateShortLinkAction } from "@/feats/profile/actions/profile.action";
import { useEffect } from "react";

function ShortLinkUpdater({ shortLink }: { shortLink: string }) {
  useEffect(() => {
    updateShortLinkAction({}, shortLink);
  }, []);

  return <></>;
}
export default ShortLinkUpdater;
