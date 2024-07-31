"use client";

import { memo, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  LinkCardType,
  profileDefaultList,
  SizeType,
} from "./config/niwi-profile-config";
import NiwiProfileLinkItem from "./niwi-profile-link-item";
import NiwiProfileLinkWrapper from "./niwi-profile-link-wrapper";

function NiwiProfileLink() {
  const [data, setData] = useState(profileDefaultList);

  const handleIndexSize = useCallback(
    (index: number, type: string, size: SizeType) => {
      setData((prev) => {
        if (prev?.[index]) prev[index].size = size;
        return [...prev];
      });
    },
    []
  );

  const onSwap = useCallback((itemOne: LinkCardType, itemTwo: LinkCardType) => {
    if (itemOne.id === itemTwo.id) return;
    setData((prev) => {
      const updateArr = [...prev];
      const item1Index = updateArr.findIndex((i) => i.id === itemOne.id);
      const item2Index = updateArr.findIndex((i) => i.id === itemTwo.id);

      const item1 = updateArr[item1Index];
      const item2 = updateArr[item2Index];
      if (item1Index < 0 || item2Index < 0 || !item1 || !item2)
        return updateArr;

      // Mangaing Sizes and Temporary Storage
      const temp = { ...item1 };
      const temp1Size = (temp.size + "") as SizeType;
      const item2Size = (item2.size + "") as SizeType;

      console.log({ temp1Size, item2Size });
      // Update Item1 Case
      updateArr[item1Index] = {
        ...item2,
        size: JSON.parse(JSON.stringify(temp1Size)),
      };

      // Update Item2 Case
      updateArr[item2Index] = {
        ...temp,
        size: JSON.parse(JSON.stringify(item2Size)),
      };

      return [...updateArr];
    });
  }, []);

  const positionChange = useCallback(
    (
      targetItem: LinkCardType,
      pointItem: LinkCardType,
      pointIndex: number,
      pointTo: "left" | "right"
    ) => {
      setData((prevData) => {
        const filterItem = prevData.filter((i) => i.id !== targetItem.id);
        const pointerIndex = prevData.findIndex((i) => i.id === pointItem.id);
        const newItem = prevData.find((i) => i.id === targetItem.id);

        // Move the First Item
        if (pointerIndex === 0 && pointTo === "left") {
          return newItem ? [newItem, ...filterItem] : prevData;
        }

        // Move to the Last Item
        if (pointerIndex === prevData.length - 1 && pointTo === "right") {
          return newItem ? [...filterItem, newItem] : prevData;
        }

        const insertIndex =
          pointTo === "left" ? pointerIndex - 1 : pointerIndex + 1;
        // Same Target Item
        if (prevData[insertIndex]?.id === targetItem.id) {
          return prevData;
        }

        const filterPointIndex = filterItem.findIndex(
          (i) => i.id === pointItem.id
        );

        const newInsertIndex =
          pointTo === "left" ? filterPointIndex : filterPointIndex + 1;
        if (newItem) filterItem.splice(newInsertIndex, 0, newItem);
        return [...filterItem];
      });
    },
    []
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="min-h-[100px] flex flex-1 flex-row flex-wrap self-start transition-all">
        {data.map((item, index) => {
          return (
            <NiwiProfileLinkWrapper
              key={item.id}
              item={item}
              index={index}
              handleSize={handleIndexSize}
              itemLength={data.length}
              onSwap={onSwap}
              onPositionChange={positionChange}
            >
              <NiwiProfileLinkItem item={item} />
            </NiwiProfileLinkWrapper>
          );
        })}
      </section>
    </DndProvider>
  );
}
export default memo(NiwiProfileLink);
