"use client";
import { setDarkModeCookie } from "@/feats/setting/actions/setting.action";
import { cn } from "@/libs/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
};

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = useCallback(() => {
    const isDark = document.body.classList.contains("dark");
    setIsDarkMode(!isDark);
    setDarkModeCookie(!isDark);
    document.body.classList.toggle("dark");
  }, []);

  useEffect(() => {
    const isDark = document.body.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  return (
    <button
      type="button"
      className={cn("niwi-toggler", className)}
      onClick={handleToggleDarkMode}
    >
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
