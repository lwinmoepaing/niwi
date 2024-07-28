import { PublishedBlog } from "@/types/blog-response";
import { create } from "zustand";

interface BlogStoreStage {
  currentBlog: PublishedBlog | null;
  setCurrentBlog: (blog: PublishedBlog) => void;
  updateComment: (type: "INCREMENT" | "DECREMENT") => void;
}

const useBlogStore = create<BlogStoreStage>()((set) => ({
  currentBlog: null,
  setCurrentBlog: (currentBlog: PublishedBlog) => set({ currentBlog }),
  updateComment: (type: "INCREMENT" | "DECREMENT") =>
    set((prev) => {
      const updateStore = { ...prev };

      if (updateStore.currentBlog) {
        if (type === "INCREMENT") {
          if (updateStore.currentBlog?._count?.blogComments) {
            updateStore.currentBlog._count.blogComments += 1;
          } else {
            updateStore.currentBlog._count = { blogComments: 1 };
          }
        }

        if (type === "DECREMENT") {
          if (
            updateStore.currentBlog?._count?.blogComments &&
            updateStore.currentBlog?._count?.blogComments >= 0
          ) {
            updateStore.currentBlog._count.blogComments -= 1;
          } else {
            updateStore.currentBlog._count = { blogComments: 0 };
          }
        }
      }

      return updateStore;
    }),
}));

export default useBlogStore;
