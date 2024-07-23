"use client";

import { cn } from "@/libs/utils";
import { Delete, Edit } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function NiwiBlogSettingMenu() {
  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        setActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      className={cn("niwi-blog-setting-menu", active && "active")}
      onClick={toggleActive}
      ref={ref}
    >
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />

      <div className={cn("menu", active && "active")}>
        <button type="button" className="">
          <Edit size={14} className="icon" />
          <span className="button-text">Edit Blog</span>
        </button>
        <button type="button" className="">
          <Delete size={14} className="icon" />
          <span className="button-text">Delete Blog</span>
        </button>
      </div>
    </div>
  );
}
export default NiwiBlogSettingMenu;
