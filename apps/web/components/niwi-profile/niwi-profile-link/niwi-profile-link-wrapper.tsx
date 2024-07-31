"use client";

import { cn } from "@/libs/utils";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  acceptableType,
  LinkCardType,
  SizeType,
} from "./config/niwi-profile-config";
import NiwiProfileDroppableSpace from "./niwi-profile-droppable-space";
import NiwiProfileLinkSetting from "./niwi-profile-link-setting";

type NiwiProfileLinkWrapperProps = PropsWithChildren<{
  item: LinkCardType;
  itemLength: number;
  index: number;
  handleSize: (index: number, type: string, size: SizeType) => void;
  onSwap: (itemOne: LinkCardType, itemTwo: LinkCardType) => void;
  onPositionChange: (
    targetItem: LinkCardType,
    pointItem: LinkCardType,
    pointIndex: number,
    pointTo: "left" | "right"
  ) => void;
}>;

function NiwiProfileLinkWrapper({
  children,
  item,
  item: { type, size },
  index,
  onSwap,
  handleSize,
  onPositionChange,
}: NiwiProfileLinkWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dropItemRef = useRef<HTMLDivElement>(null);

  const calculateSize = useCallback((size: SizeType) => {
    return size === "square"
      ? "w-[33%]"
      : size === "half"
        ? "w-[50%]"
        : size === "sixty"
          ? "w-[66%]"
          : "w-full";
  }, []);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: type,
      item: item,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    []
  );

  const [{ isOver, canDrop }, dropRef] = useDrop(
    {
      accept: acceptableType,
      drop(dropItem, monitor) {
        if (monitor.canDrop()) {
          onSwap(item, dropItem as LinkCardType);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    },
    [item.id]
  );

  const leftUpdate = useCallback(
    (targetItem: LinkCardType) => {
      onPositionChange(targetItem, item, index, "left");
    },
    [onPositionChange, item, index]
  );

  const rightUpdate = useCallback(
    (targetItem: LinkCardType) => {
      onPositionChange(targetItem, item, index, "right");
    },
    [onPositionChange, item, index]
  );

  useEffect(() => {
    dragRef(ref);
    dropRef(dropItemRef);
  }, []);

  return (
    <div
      className={cn("niwi-profile-wrapper", calculateSize(size))}
      style={{ opacity }}
      ref={ref}
    >
      <div
        className={cn(
          "niwi-profile-linked-container transition-all",
          isOver && canDrop ? "niwi-profile-swing-animation" : ""
        )}
      >
        <NiwiProfileLinkSetting
          type={type}
          index={index}
          size={size}
          handleSize={handleSize}
        />
        <div
          ref={dropItemRef}
          className="flex-1 rounded-[1rem] overflow-hidden"
        >
          {isOver && canDrop ? (
            <div className="w-full h-full border-dashed	 border-[2px] border-blue-400 rounded-[1rem] flex justify-center items-center">
              SWAP ??
            </div>
          ) : (
            children
          )}
        </div>
        {size === "full" && (
          <>
            {index !== 0 && (
              <NiwiProfileDroppableSpace onDrop={leftUpdate} position="top" />
            )}
            <NiwiProfileDroppableSpace onDrop={rightUpdate} position="bottom" />
            {index === 0 && (
              <NiwiProfileDroppableSpace onDrop={leftUpdate} position="left" />
            )}
          </>
        )}

        {size !== "full" && index === 0 && (
          <>
            <NiwiProfileDroppableSpace onDrop={leftUpdate} position="left" />
            <NiwiProfileDroppableSpace onDrop={rightUpdate} position="right" />
          </>
        )}

        {size !== "full" && index !== 0 && (
          <>
            <NiwiProfileDroppableSpace onDrop={leftUpdate} position="left" />
            <NiwiProfileDroppableSpace onDrop={rightUpdate} position="right" />
          </>
        )}
      </div>
    </div>
  );
}

export default NiwiProfileLinkWrapper;
