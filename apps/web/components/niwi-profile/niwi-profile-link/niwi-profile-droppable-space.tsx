"use client";

import { cn } from "@/libs/utils";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { acceptableType, LinkCardType } from "./config/niwi-profile-config";

type NiwiProfileDroppableSpaceProps = {
  position: "top" | "left" | "bottom" | "right";
  onDrop: (item: LinkCardType) => void;
};

const defaultStyle = "absolute bg-blue-500 transition-all cursor-pointer";

function NiwiProfileDroppableSpace({
  position,
  onDrop,
}: NiwiProfileDroppableSpaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, dropRef] = useDrop(
    {
      accept: acceptableType,
      drop(item, monitor) {
        if (monitor.canDrop()) {
          onDrop(item as LinkCardType);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    },
    []
  );

  dropRef(ref);

  switch (position) {
    case "top":
      return (
        <div
          ref={ref}
          className={cn(
            defaultStyle,
            isOver && canDrop ? "opacity-100" : "opacity-0",
            "-top-[10px] w-full h-[10px] rounded-[2px]"
          )}
        />
      );

    case "bottom":
      return (
        <div
          ref={ref}
          className={cn(
            defaultStyle,
            isOver && canDrop ? "opacity-100" : "opacity-0",
            "bottom-[-10px] w-full h-[10px] rounded-[2px]"
          )}
        />
      );

    case "left":
      return (
        <div
          ref={ref}
          className={cn(
            defaultStyle,
            isOver && canDrop ? "opacity-100" : "opacity-0",
            "left-[-10px] w-[10px] h-full rounded-[2px]"
          )}
        />
      );

    case "right":
      return (
        <div
          ref={ref}
          className={cn(
            defaultStyle,
            isOver && canDrop ? "opacity-100" : "opacity-0",
            "right-[-10px] w-[10px] h-full rounded-[2px]"
          )}
        />
      );

    default:
      return <></>;
  }
}
export default NiwiProfileDroppableSpace;
