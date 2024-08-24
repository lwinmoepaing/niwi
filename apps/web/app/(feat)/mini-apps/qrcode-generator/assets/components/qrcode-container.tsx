"use client";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const QrCodeContainer = () => {
  const [input, setInput] = useState<string>("niwi-docs.com");
  const [debouncedInput, setDebouncedInput] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);
  return (
    <section className="flex flex-col gap-10">
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 240,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{
            height: "auto",
            maxWidth: "100%",
            width: "100%",
          }}
          className={
            "bg-gradient-to-br from-[#f43f5e]  via-[#7e22ce] via-50% to-[#60a5fa] p-3 rounded-sm "
          }
          value={debouncedInput}
          viewBox={`0 0 256 256`}
        />
      </div>
      <input
        type="search"
        id="default-search"
        onChange={(e) => setInput(e.target.value)}
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 lg:text-xl dark:focus:border-blue-500"
        placeholder="niwi-docs.com"
        required
      />
    </section>
  );
};

export default QrCodeContainer;
