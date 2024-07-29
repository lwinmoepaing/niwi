import { generateMetaForPagination } from "@/libs/utils";
import { BookmarkBlogResponse } from "@/types/blog-response";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBookmarkBlogAction } from "../actions/blog.action";
import { getBookmarkKeyByUserId } from "../services/blog-query-cache.service";

type GetBookmarkedBlogsProps = {
  pageNo: number;
  userId?: string;
};

const getBookmarkedBlogsFn = async ({
  pageNo = 1,
  userId,
}: GetBookmarkedBlogsProps): Promise<BookmarkBlogResponse> => {
  const defaultData = {
    message: "",
    data: [],
    meta: generateMetaForPagination({ page: 1, totalPages: 0 }),
  };
  if (!userId) {
    return defaultData;
  }

  const response = await getBookmarkBlogAction({
    page: pageNo,
    userId,
  });

  if (response?.success && response?.data) {
    return {
      data: response.data.data,
      meta: response.data.meta,
      message: "Successfully Fetched Bookmark Blogs.",
    };
  } else {
    return defaultData;
  }
};

export const useGetBookmarkedBlogs = ({ userId }: GetBookmarkedBlogsProps) => {
  // Using useInfiniteQuery to handle paginated queries
  return useInfiniteQuery({
    structuralSharing: (oldData, newData) =>
      oldData === newData ? oldData : newData,
    initialPageParam: 1,
    staleTime: 1000 * 60,
    queryKey: getBookmarkKeyByUserId(userId || ""),
    queryFn: ({ pageParam = 0 }) =>
      getBookmarkedBlogsFn({
        pageNo: pageParam as number,
        userId,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasNextPage
        ? lastPage.meta.currentPage + 1
        : undefined;
    },
    enabled: !!userId,
  });
};
