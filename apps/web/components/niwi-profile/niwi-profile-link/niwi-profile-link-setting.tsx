"use client";

import { cn } from "@/libs/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  GalleryVertical,
  RectangleHorizontal,
  Settings,
  Square,
  SquareSplitHorizontal,
  X,
} from "lucide-react";

type SizeType = "half" | "full" | "square" | "sixty";

type NiwiProfileLinkSettingProps = {
  type: string;
  index: number;
  size: SizeType;
  onDelete: () => void;
  handleSize: (index: number, type: string, size: SizeType) => void;
};

function NiwiProfileLinkSetting({
  size,
  index,
  type,
  onDelete,
  handleSize,
}: NiwiProfileLinkSettingProps) {
  const settingRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const checkActiveSize = useCallback(
    (checkSize: SizeType) => {
      return checkSize === size;
    },
    [size]
  );

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        settingRef.current &&
        !settingRef.current?.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [settingRef]);

  return (
    <section className="niwi-profile-linked-setting-container">
      <div
        className="niwi-profile-linked-setting-icon"
        ref={settingRef}
        onClick={toggleActive}
      >
        <Settings size={12} />
        <div className={cn("menu", active && "active")}>
          <button
            className={cn("icon", checkActiveSize("square") && "active")}
            onClick={(e) => {
              e.stopPropagation();
              handleSize(index, type, "square");
            }}
          >
            <Square size={12} />
          </button>
          <button
            className={cn("icon", checkActiveSize("sixty") && "active")}
            onClick={(e) => {
              e.stopPropagation();
              handleSize(index, type, "sixty");
            }}
          >
            <RectangleHorizontal size={12} />
          </button>
          <button
            className={cn("icon", checkActiveSize("half") && "active")}
            onClick={(e) => {
              e.stopPropagation();
              handleSize(index, type, "half");
            }}
          >
            <SquareSplitHorizontal size={12} />
          </button>
          <button
            className={cn("icon", checkActiveSize("full") && "active")}
            onClick={(e) => {
              e.stopPropagation();
              handleSize(index, type, "full");
            }}
          >
            <GalleryVertical size={12} />
          </button>
        </div>
      </div>

      <div
        className="niwi-profile-linked-setting-icon close"
        onClick={onDelete}
      >
        <X size={13} />
      </div>
    </section>
  );
}
export default memo(NiwiProfileLinkSetting);
