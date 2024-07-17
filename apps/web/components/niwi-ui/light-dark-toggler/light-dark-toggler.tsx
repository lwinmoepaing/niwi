"use client";
import { cn } from "@/libs/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
};

const DARKMODE_KEY = "niwiDarkMode";

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const setCookie = useCallback((name: string, value: string) => {
    let expires = "";
    document.cookie =
      name + "=" + (value || "") + expires + "; path=/; priority=high";
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    const isDark = document.body.classList.contains("dark");
    setIsDarkMode(!isDark);
    setCookie(DARKMODE_KEY, (!isDark).toString());
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
