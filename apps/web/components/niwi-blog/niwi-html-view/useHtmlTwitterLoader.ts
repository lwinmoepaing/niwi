import { useCallback, useEffect, useRef, useState } from "react";

const WIDGET_SCRIPT_URL = "https://platform.twitter.com/widgets.js";

type TwitterItemType = {
  twitterId: string;
  dom: Element;
  isLoading: boolean;
};

function useHtmlTwitterLoader({ htmlText }: { htmlText: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const twitterListRef = useRef<TwitterItemType[]>([]);

  const [isTwitterScriptLoading, setIsTwitterScriptLoading] = useState(true);

  const createTweet = useCallback(async (twitterData: TwitterItemType) => {
    try {
      twitterData.dom.innerHTML = "";
      // @ts-expect-error Twitter is attached to the window.
      await window.twttr.widgets.createTweet(
        twitterData.twitterId,
        twitterData.dom
      );

      twitterData.isLoading = false;
    } catch (error) {
      twitterData.isLoading = false;
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && isTwitterScriptLoading === false) {
      const doms = containerRef.current.querySelectorAll(
        "div[data-lexical-twitter-id]"
      );

      doms.forEach((dom) => {
        const attribute = dom.getAttribute("data-lexical-twitter-id");
        twitterListRef.current.push({
          twitterId: attribute || "",
          dom: dom.childNodes?.[0] as Element,
          isLoading: false,
        });
      });

      twitterListRef.current.map((twitter) => {
        twitter.isLoading = true;
        setTimeout(() => (twitter.isLoading = false), 2000);
        createTweet(twitter);
      });
    }
  }, [isTwitterScriptLoading, htmlText]);

  useEffect(() => {
    if (isTwitterScriptLoading) {
      const isAlready = document.querySelector(
        'script[src="' + WIDGET_SCRIPT_URL + '"]'
      );

      if (isAlready) {
        setIsTwitterScriptLoading(false);
        return;
      }

      const script = document.createElement("script");
      script.src = WIDGET_SCRIPT_URL;
      script.async = true;
      document.body?.appendChild(script);
      script.onload = () => {
        setIsTwitterScriptLoading(false);
      };
    }
  }, [isTwitterScriptLoading]);

  return {
    containerRef,
  };
}
export default useHtmlTwitterLoader;
