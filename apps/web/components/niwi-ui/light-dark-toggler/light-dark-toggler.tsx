"use client";
import { cn } from "@/libs/utils";
import useAppStore from "@/stores/app/app.store";
import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
};

const DARKMODE_KEY = "niwiDarkMode";

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [setTheme] = useAppStore((store) => [store.setTheme]);

  const setCookie = useCallback((name: string, value: string) => {
    const expires = "";
    document.cookie =
      name + "=" + (value || "") + expires + "; path=/; priority=high";
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    const isDark = document.body.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
    setIsDarkMode(!isDark);
    setCookie(DARKMODE_KEY, (!isDark).toString());
    document.body.classList.toggle("dark");
  }, []);

  useEffect(() => {
    const isDark = document.body.classList.contains("dark");
    setIsDarkMode(isDark);
    setTheme(isDark ? "dark" : "light");
  }, []);

  return (
    <button
      type="button"
      className={cn("niwi-toggler", className)}
      onClick={handleToggleDarkMode}
    >
      {isDarkMode ? <MoonIcon size={18} /> : <SunIcon size={18} />}
    </button>
  );
}
