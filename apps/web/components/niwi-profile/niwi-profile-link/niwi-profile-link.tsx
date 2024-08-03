"use client";

import { getGithubInfo } from "@/feats/profile/api/get-github-info";
import { getYoutubeInfo } from "@/feats/profile/api/get-youtube-info";
import { SaveProfileFormValues } from "@/feats/profile/validation/profile.validation";
import useProfileStore from "@/stores/profile/profile.store";
import { CircleDashed } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  LinkCardType,
  makeBuyMeACoffeeCard,
  makeFacebookCard,
  makeGitHubCard,
  makeInstagramCard,
  makeSpotifyCard,
  makeTwitterCard,
  makeYoutubeCard,
  SizeType,
} from "./config/niwi-profile-config";
import NiwiProfileLinkItem from "./niwi-profile-link-item";
import NiwiProfileLinkWrapper from "./niwi-profile-link-wrapper";

type NiwiProfileLinkProps = {
  isEditing: boolean;
  onChangeGridProfile: (data: SaveProfileFormValues["gridProfile"]) => void;
  defaultData: SaveProfileFormValues["gridProfile"];
};

function NiwiProfileLink({
  isEditing,
  defaultData,
  onChangeGridProfile,
}: NiwiProfileLinkProps) {
  const [data, setData] = useState(defaultData);
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
        if (inputRef?.current && !inputRef.current.value) {
          inputRef.current.value = pastedText;
        }
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

        setTimeout(() => {
          clearInput();
          setFetchLoading(false);
        }, 200);
        return;
      }

      // Spotify
      const spotifyRegex = /https:\/\/open\.spotify\.com\/(user)\/([\w-]+)/;
      const spotifyMatch = spotifyRegex.exec(pastedText);
      if (spotifyMatch) {
        if (inputRef?.current && !inputRef.current.value) {
          inputRef.current.value = pastedText;
        }
        const spotify = makeSpotifyCard(pastedText);
        setData((prev) => [...prev, spotify]);
        setTimeout(() => {
          clearInput();
        }, 200);
        return;
      }

      // BuyMeACoffeee
      const buyMeACoffeeRegex = /https:\/\/buymeacoffee\.com\/([\w-]+)/;
      const buyMeACoffeeMatch = buyMeACoffeeRegex.exec(pastedText);
      if (buyMeACoffeeMatch) {
        if (inputRef?.current && !inputRef.current.value) {
          inputRef.current.value = pastedText;
        }
        const buyMeACoffee = makeBuyMeACoffeeCard(pastedText);
        setData((prev) => [...prev, buyMeACoffee]);
        setTimeout(() => {
          clearInput();
        }, 200);
        return;
      }

      // Facebook
      const facebookRegex =
        /https:\/\/www\.facebook\.com\/(profile.php\?id=(\d+)|([\w.-]+))/;
      const facebookMatch = facebookRegex.exec(pastedText);
      if (facebookMatch) {
        if (inputRef?.current && !inputRef.current.value) {
          inputRef.current.value = pastedText;
        }
        const facebook = makeFacebookCard(pastedText);
        setData((prev) => [...prev, facebook]);
        setTimeout(() => {
          clearInput();
        }, 200);
        return;
      }

      // Twitter
      const twitterRegex = /https:\/\/twitter\.com\/([\w-]+)/;
      const xComRegex = /https:\/\/x\.com\/([\w-]+)/;
      const twitterMatch = twitterRegex.exec(pastedText);
      const xComMatch = xComRegex.exec(pastedText);
      if (twitterMatch || xComMatch) {
        if (inputRef?.current && !inputRef.current.value) {
          inputRef.current.value = pastedText;
        }
        const twitter = makeTwitterCard(pastedText);
        setData((prev) => [...prev, twitter]);
        setTimeout(() => {
          clearInput();
        }, 200);
        return;
      }

      // Instagram
      const instagramRegex = /https:\/\/www\.instagram\.com\/([\w-]+)/;
      const instagramMatch = instagramRegex.exec(pastedText);
      if (instagramMatch) {
        if (inputRef?.current && !inputRef.current.value) {
          inputRef.current.value = pastedText;
        }
        const Instagram = makeInstagramCard(pastedText);
        setData((prev) => [...prev, Instagram]);
        setTimeout(() => {
          clearInput();
        }, 200);
        return;
      }
    },
    [clearInput]
  );

  const onDelete = useCallback((item: LinkCardType) => {
    setData((prev) => prev.filter((i) => i.id !== item.id));
  }, []);

  useEffect(() => {
    onChangeGridProfile(data);
  }, [data, onChangeGridProfile]);

  return (
    <div className="w-full">
      <DndProvider backend={HTML5Backend}>
        <section className="flex flex-1 flex-row flex-wrap self-start transition-all">
          {data.map((item, index) => {
            return (
              <NiwiProfileLinkWrapper
                key={`${item.id}_${item.type}`}
                item={item}
                index={index}
                handleSize={handleIndexSize}
                itemLength={data.length}
                onSwap={onSwap}
                onPositionChange={positionChange}
                onDelete={onDelete}
                isEditing={isEditing}
              >
                <NiwiProfileLinkItem item={item} />
              </NiwiProfileLinkWrapper>
            );
          })}
        </section>
      </DndProvider>
      {isEditing && (
        <section className="px-[10px] flex flex-row relative">
          <input
            ref={inputRef}
            className="niwi-profile-sub-header niwi-profile-grid-input editor"
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
      )}
    </div>
  );
}
export default memo(NiwiProfileLink);
