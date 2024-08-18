// app/screenshot/page.js
"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { captureScreenshot } from "@/feats/mini-apps/actions/screenshot.action";
import toast from "react-hot-toast";
import EnterIcon from "../../../todo/assets/components/enter-icon";
import { CircleDashed } from "lucide-react";
import { cn } from "@/libs/utils";

const PreviewScreenshot = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCapture = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setScreenshot("");
    setError(""); // Reset error
    try {
      const screenshotData = await captureScreenshot(url);
      if (screenshotData.success && screenshotData.data) {
        setScreenshot(`data:image/png;base64,${screenshotData.data}`);
      } else {
        toast.error(screenshotData.message);
      }
    } catch (err) {
      setError((err as Error).message); // Capture and display validation error
    }
    setLoading(false);
  }, [url]);

  return (
    <div>
      <section className="text-center mb-5">
        <h2 className="niwi-logo-text text-xl">Preview Url</h2>
      </section>
      <div className="h-[40px] flex-1 px-[10px] bg-white rounded-lg dark:bg-[#111119] border dark:border-[#303039] flex flex-row items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
          className="w-full h-full bg-transparent outline-none ring-0"
          ref={inputRef}
          disabled={loading}
          onKeyUp={(e) => {
            if (e.key === "Enter") return handleCapture();
          }}
        />
        <button
          onClick={handleCapture}
          disabled={loading}
          className="rounded-md hover:bg-[#f9f9f9] hover:dark:bg-[#1c1c25] text-xs flex flex-row px-[10px] py-[2px]"
        >
          {loading ? (
            <CircleDashed className="animate-spin" />
          ) : (
            <>
              <EnterIcon /> Screenshot
            </>
          )}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        className={cn(
          "relative bg-[#fafafa] dark:bg-[#181822] h-[260px] md:h-[300px] lg:h-[440px] mt-3 rounded-xl overflow-hidden",
          loading && "flex justify-center items-center"
        )}
      >
        {!loading && screenshot && (
          <Image
            src={screenshot}
            alt="Webpage Screenshot"
            fill
            objectFit="cover"
            objectPosition="top center"
          />
        )}
        {loading && <CircleDashed size={30} className="animate-spin" />}
      </div>
    </div>
  );
};

export default PreviewScreenshot;
