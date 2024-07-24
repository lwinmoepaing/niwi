import { queryClient } from "@/libs/api/react-query";
import { Blog, BlogsByAuthorResponse, SingleBlog } from "@/types/blog-response";
import { InfiniteData } from "@tanstack/react-query";

const getAuthorUnPublishedBlogQueryKey = (authorId: string) => {
  return ["get-blogs-by-author", authorId, false];
};
const getAuthorPublishedBlogQueryKey = (authorId: string) => {
  return ["get-blogs-by-author", authorId, true];
};

const getAllKeys = (authorId: string) => {
  return [
    getAuthorUnPublishedBlogQueryKey(authorId),
    getAuthorPublishedBlogQueryKey(authorId),
  ];
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
  const keys = getAllKeys(data.user.id);

  keys.forEach((key) => {
    const exisitingCache = queryClient.getQueryData(key);

    if (exisitingCache) {
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
  data: Blog | SingleBlog,
  pages: BlogsByAuthorResponse[]
): BlogsByAuthorResponse[] => {
  return pages.reduce((prev, page) => {
    page.data = page.data.filter((item) => {
      const condition = item.id !== data.id;
      return condition;
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

export const deleteBlogQueryCacheUpdate = (data: SingleBlog) => {
  const keys = getAllKeys(data.userId);

  keys.forEach((key) => {
    const exisitingCache = queryClient.getQueryData(key);

    if (exisitingCache) {
      queryClient.setQueryData(
        key,
        (oldData: InfiniteData<BlogsByAuthorResponse, unknown>) => {
          return {
            ...oldData,
            pages: updateFnForRemovingBlog(data, oldData.pages),
          };
        }
      );
    }
  });
};
