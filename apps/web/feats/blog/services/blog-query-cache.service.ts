import { queryClient } from "@/libs/api/react-query";
import { Blog, BlogsByAuthorResponse } from "@/types/blog-response";
import { InfiniteData } from "@tanstack/react-query";

const getAuthorUnPublishedBlogQueryKey = (authorId: string) => {
  return ["get-blogs-by-author", authorId, false];
};

export const createBlogCacheUpdate = (data: Blog, authorId: string) => {
  const publishedKey = getAuthorUnPublishedBlogQueryKey(authorId);

  const exisitingCache = queryClient.getQueryData(publishedKey);

  console.log({ exisitingCache });

  if (exisitingCache) {
    // This ensures that only the specific pages data is updated.
    queryClient.setQueryData(
      publishedKey,
      (oldData: InfiniteData<BlogsByAuthorResponse, unknown>) => {
        if (oldData.pages[0]?.data) {
          console.log({ firstPage: oldData.pages[0]?.data });
          oldData.pages[0].data = [data, ...oldData.pages[0].data];
        }
        return {
          ...oldData,
          pages: oldData.pages,
        };
      }
    );
  }
};
