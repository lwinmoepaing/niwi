import { create } from "zustand";

interface AppStoreStage {
  theme: "dark" | "light";
  setTheme: (link: "dark" | "light") => void;
}

const useAppStore = create<AppStoreStage>()((set) => ({
  theme:
    typeof document !== "undefined"
      ? document?.body?.classList?.contains("dark")
        ? "dark"
        : "light"
      : "dark",
  setTheme: (theme: "dark" | "light") => set((prev) => ({ ...prev, theme })),
}));

export default useAppStore;
