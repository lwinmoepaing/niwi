"use client";

import { cn } from "@/libs/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import NiwiBlogShareIcon from "../niwi-blog-icons/niwi-blog-share-icon";
import toast from "react-hot-toast";

type NiwiBlogShareSettingProps = {
  link: string;
};

function NiwiBlogShareSetting({ link }: NiwiBlogShareSettingProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  const handleCopyClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      //
    }
  }, [navigator]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        setActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      className={cn("niwi-blog-share-icon-container", active && "active")}
      onClick={toggleActive}
      ref={ref}
    >
      <NiwiBlogShareIcon />
      <span className="niwi-share-setting-down-arrow"></span>
      <div className={cn("niwi-share-setting", active && "active")}>
        <button type="button" className="color-text" onClick={handleCopyClick}>
          Copy to clipboard
        </button>
        <FacebookShareButton
          type="button"
          children={<span className="color-text">Facebook</span>}
          url={link}
        />
        <TwitterShareButton
          className="color-text"
          type="button"
          children={<span className="color-text">Twitter</span>}
          url={link}
        />
      </div>
    </div>
  );
}
export default memo(NiwiBlogShareSetting);
