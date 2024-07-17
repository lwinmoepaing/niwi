import { useUnsplashImages } from "@/feats/blog/api/get-unsplash-images";
import { checkNextPageAndPreviousPage, cn } from "@/libs/utils";
import { SplashResult } from "@/types/splash-response";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $getNodeByKey } from "lexical";
import Image from "next/image";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useEditorKeydown,
  useNodeActive,
  useNodeFocus,
} from "../../../editor-utils/editor-keydown-paragraph";
import { $createNiwiImageNode } from "../../NiwiImagePlugin/nodes/NiwiImageNode";
import NiwiSplashLoading from "./NiwiSplashLoading";

type NiwiEditorSplashImageProps = {
  nodeKey: string;
};

const NiwiEditorSplashImage = ({ nodeKey }: NiwiEditorSplashImageProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();

  const [search, setSearchName] = useState<string>("");

  const [searchOption, setSearchOption] = useState({
    searchQuery: "",
    pageNo: 1,
  });

  const { isFocus } = useNodeFocus({ nodeKey });
  const { ref } = useNodeActive<HTMLDivElement>({
    handleOutside: () => {
      replaceExisingTextWithParagraph("", "middle");
    },
  });
  const { replaceExisingTextWithParagraph } = useEditorKeydown({ nodeKey });

  const { isLoading, data } = useUnsplashImages({
    pageNo: searchOption.pageNo,
    search: searchOption.searchQuery.trim(),
    queryConfig: {},
  });

  const handleKeyDownSearch = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.isPropagationStopped();
      switch (event.key) {
        case "Backspace":
        case "Delete":
          if (!searchRef?.current?.value?.trim?.())
            replaceExisingTextWithParagraph("", "middle");
          return;
        case "ArrowUp":
          searchRef?.current?.blur();
          replaceExisingTextWithParagraph("", "middle");
          return;
        case "Enter":
          setSearchOption({
            pageNo: 1,
            searchQuery: searchRef?.current?.value?.trim() || "",
          });
          return;
      }
    },
    [searchRef]
  );

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setSearchOption((prev) => {
      if (prev.pageNo - 1 <= 0) return { ...prev };
      return {
        pageNo: prev.pageNo - 1,
        searchQuery: prev.searchQuery.trim() || "",
      };
    });
  }, []);

  const handleNextPage = useCallback(() => {
    setSearchOption((prev) => {
      return {
        pageNo: prev.pageNo + 1,
        searchQuery: prev.searchQuery.trim() || "",
      };
    });
  }, []);

  const getPaginate = useMemo(() => {
    return checkNextPageAndPreviousPage({
      page: searchOption.pageNo,
      limitCount: 9,
      totalCount: data?.total || 0,
    });
  }, [searchOption]);

  const threeColumnData = useMemo<{
    first: SplashResult[];
    second: SplashResult[];
    third: SplashResult[];
  }>(() => {
    if (!data) {
      return { first: [], second: [], third: [] };
    }

    const results = data.results;
    const first = results.slice(0, 3);
    const second = results.slice(3, 6);
    const third = results.slice(6, 9);

    return {
      first,
      second,
      third,
    };
  }, [data]);

  const onChooseImage = useCallback(
    (data: SplashResult) => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        const niwiImageNode = $createNiwiImageNode({
          src: data.urls.regular,
          imgSize: "fitWidth",
          altText: `Photo by ${data.user.name} on Unsplash`,
        });
        node?.replace(niwiImageNode);
        const isSibling = niwiImageNode.getNextSibling();
        if (!isSibling) {
          const text = $createTextNode("");
          const p = $createParagraphNode().append(text);
          niwiImageNode.insertAfter(p);
        }
        niwiImageNode.selectEnd();
      });
    },
    [editor]
  );

  useEffect(() => {
    searchRef?.current?.focus();
  }, [isFocus]);

  return (
    <div ref={ref}>
      <input
        ref={searchRef}
        className="niwi-editor-splash-image-input"
        placeholder="Type keyword to search Unsplash and press Enter"
        onChange={handleSearch}
        onKeyDown={handleKeyDownSearch}
        value={search}
      />

      <hr />

      <div className="flex flex-row justify-between text-sm mt-[10px]">
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            !getPaginate.previousPage && "opacity-30"
          )}
          disabled={getPaginate.previousPage}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button type="button" className="">
          {isLoading ? "..." : !data ? "..." : `${data?.total || ""} images`}
        </button>
        <button
          type="button"
          className={cn(
            "cursor-pointer",
            !getPaginate.nextPage && "opacity-30"
          )}
          disabled={getPaginate.nextPage}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>

      {isLoading && <NiwiSplashLoading />}

      {!!data?.results && data?.results?.length > 0 && (
        <div className="niwi-editor-splash-photo-gallery">
          <div className="niwi-editor-splash-photo-column-photo">
            {threeColumnData.first.map((data) => (
              <Image
                key={data.id}
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt={`Photo by ${data.user.name} on Unsplash`}
                src={data.urls.regular}
                onClick={() => onChooseImage(data)}
              />
            ))}
          </div>
          <div className="niwi-editor-splash-photo-column-photo">
            {threeColumnData.second.map((data) => (
              <Image
                key={data.id}
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt={`Photo by ${data.user.name} on Unsplash`}
                src={data.urls.regular}
                onClick={() => onChooseImage(data)}
              />
            ))}
          </div>
          <div className="niwi-editor-splash-photo-column-photo">
            {threeColumnData.third.map((data) => (
              <Image
                key={data.id}
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt={`Photo by ${data.user.name} on Unsplash`}
                src={data.urls.regular}
                onClick={() => onChooseImage(data)}
              />
            ))}
          </div>
        </div>
      )}
      {/* <NiwiSplashDemoImageGallery /> */}
    </div>
  );
};
export default memo(NiwiEditorSplashImage);
