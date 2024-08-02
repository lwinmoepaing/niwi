import { create } from "zustand";

interface BlogStoreStage {
  stopAnimateProfileLink: string[];
  setStopAnimateProfileLink: (link: string[]) => void;
}

const useProfileStore = create<BlogStoreStage>()((set) => ({
  stopAnimateProfileLink: [],
  setStopAnimateProfileLink: (link: string[]) =>
    set((prev) => ({ ...prev, stopAnimateProfileLink: link })),
}));

export default useProfileStore;
