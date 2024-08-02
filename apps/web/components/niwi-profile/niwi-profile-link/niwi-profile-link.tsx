"use client";

import { memo, useCallback, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  LinkCardType,
  makeGitHubCard,
  makeYoutubeCard,
  profileDefaultList,
  SizeType,
} from "./config/niwi-profile-config";
import NiwiProfileLinkItem from "./niwi-profile-link-item";
import NiwiProfileLinkWrapper from "./niwi-profile-link-wrapper";
import useProfileStore from "@/stores/profile/profile.store";
import { getGithubInfo } from "@/feats/profile/api/get-github-info";
import { CircleDashed } from "lucide-react";
import { getYoutubeInfo } from "@/feats/profile/api/get-youtube-info";

function NiwiProfileLink() {
  const [data, setData] = useState(profileDefaultList);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [setStopAnimateProfileLink] = useProfileStore((store) => [
    store.setStopAnimateProfileLink,
  ]);

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
    setStopAnimateProfileLink([itemOne.id, itemTwo.id]);
    setTimeout(() => {
      setStopAnimateProfileLink([]);
    }, 302);

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

  const clearInput = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  }, [inputRef]);

  const handlePaste = useCallback(
    async (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData("Text");

      // Github
      const regex = /https:\/\/github\.com\/([\w-]+)/;
      const gitMatch = regex.exec(pastedText);
      const gitUserName = gitMatch?.[1];

      if (gitMatch && gitUserName) {
        if (inputRef?.current) {
          inputRef.current.value = pastedText;
        }

        setFetchLoading(true);

        const { success, data } = await getGithubInfo(gitUserName);

        if (success && data) {
          const gitHubCard = makeGitHubCard(
            data.name,
            `https://github.com/${gitUserName}`
          );
          setData((prev) => [...prev, gitHubCard]);
        }
        setTimeout(() => {
          clearInput();
          setFetchLoading(false);
        }, 200);

        return;
      }

      // Youtube
      const youtubeRegex = /https:\/\/www\.youtube\.com\/channel\/([\w-]+)/;
      const youtubeMatch = youtubeRegex.exec(pastedText);
      if (youtubeMatch && youtubeMatch[1]) {
        setFetchLoading(true);
        const { success, data } = await getYoutubeInfo(youtubeMatch[1]);
        if (success && data) {
          const youtubeCard = makeYoutubeCard(
            data.snippet.title,
            data.snippet.customUrl
              ? `https://youtube.com/${data.snippet.customUrl}`
              : pastedText,
            {
              subscribeCount: data.statistics.subscriberCount,
              videoCount: data.statistics.videoCount,
            }
          );
          setData((prev) => [...prev, youtubeCard]);
        }
        setFetchLoading(false);
        return;
      }

      // Sportify
      // const spotifyRegex =
      //   /https:\/\/open\.spotify\.com\/(track|album|artist|playlist)\/([\w-]+)/;
      // const sportifyMatch = spotifyRegex.exec(pastedText);
    },
    [clearInput]
  );

  return (
    <div className="w-full">
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
      <section className="px-[10px] flex flex-row relative">
        <input
          ref={inputRef}
          className="niwi-profile-sub-header niwi-profile-input editor"
          placeholder="Copy and paste your url..."
          onPaste={handlePaste}
          disabled={fetchLoading}
        />
        {fetchLoading && (
          <CircleDashed
            size={16}
            className="absolute right-3 top-[4.5px] animate-spin text-[#ff4175]"
          />
        )}
      </section>
    </div>
  );
}
export default memo(NiwiProfileLink);
