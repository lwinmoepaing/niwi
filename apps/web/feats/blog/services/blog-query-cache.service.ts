import { queryClient } from "@/libs/api/react-query";
import { Blog, BlogsByAuthorResponse } from "@/types/blog-response";
import { InfiniteData } from "@tanstack/react-query";

const getAuthorUnPublishedBlogQueryKey = (authorId: string) => {
  return ["get-blogs-by-author", authorId, false];
};
const getAuthorPublishedBlogQueryKey = (authorId: string) => {
  return ["get-blogs-by-author", authorId, true];
};

export const createBlogCacheUpdate = (data: Blog) => {
  const authorUnPublishKey = getAuthorUnPublishedBlogQueryKey(data.user.id);
  const keys = [authorUnPublishKey];

  keys.forEach((key) => {
    const exisitingCache = queryClient.getQueryData(key);
    if (exisitingCache) {
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<BlogsByAuthorResponse, unknown>) => {
          if (oldData.pages[0]?.data) {
            oldData.pages[0].data = [data, ...oldData.pages[0].data];
          }
          return {
            ...oldData,
            pages: oldData.pages,
          };
        }
      );
    }
  });
};

const updateFnForSavingBlog = (
  data: Blog,
  pages: BlogsByAuthorResponse[]
): BlogsByAuthorResponse[] => {
  return pages.reduce((prev, page) => {
    page.data.forEach((item, index) => {
      if (item.id === data.id) {
        page.data[index] = data;
      }
    });

    return [...prev, page];
  }, [] as BlogsByAuthorResponse[]);
};

export const updateBlogQueryCacheUpdate = (data: Blog) => {
  const authorUnPublishKey = getAuthorUnPublishedBlogQueryKey(data.user.id);
  const authorPublishKey = getAuthorPublishedBlogQueryKey(data.user.id);
  const keys = [authorUnPublishKey, authorPublishKey];

  keys.forEach((key) => {
    const exisitingCache = queryClient.getQueryData(key);

    if (exisitingCache) {
      // This ensures that only the specific pages data is updated.
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<BlogsByAuthorResponse, unknown>) => {
          return {
            ...oldData,
            pages: updateFnForSavingBlog(data, oldData.pages),
          };
        }
      );
    }
  });
};

const updateFnForRemovingBlog = (
  data: Blog,
  pages: BlogsByAuthorResponse[]
): BlogsByAuthorResponse[] => {
  return pages.reduce((prev, page) => {
    page.data = page.data.filter((item) => {
      return item.id !== data.id;
    });

    return [...prev, page];
  }, [] as BlogsByAuthorResponse[]);
};

export const publishBlogQueryCacheUpdate = (data: Blog) => {
  const authorUnPublishKey = getAuthorUnPublishedBlogQueryKey(data.user.id);
  const authorPublishKey = getAuthorPublishedBlogQueryKey(data.user.id);

  // First when publish, we need to remove from unpublish list
  const exisitingUnpublishCache = queryClient.getQueryData(authorUnPublishKey);
  if (exisitingUnpublishCache) {
    queryClient.setQueryData(
      authorUnPublishKey,
      (oldData: InfiniteData<BlogsByAuthorResponse, unknown>) => {
        return {
          ...oldData,
          pages: updateFnForRemovingBlog(data, oldData.pages),
        };
      }
    );
  }

  // Adding Blog to Published List
  const exisitingPublishCache = queryClient.getQueryData(authorPublishKey);
  if (exisitingPublishCache) {
    queryClient.setQueryData(
      authorPublishKey,
      (oldData: InfiniteData<BlogsByAuthorResponse, unknown>) => {
        if (oldData.pages[0]?.data) {
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
