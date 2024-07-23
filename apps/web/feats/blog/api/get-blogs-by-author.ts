import axiosClient from "@/libs/api/axios-client";
import { BlogsByAuthorResponse } from "@/types/blog-response";
import { useInfiniteQuery } from "@tanstack/react-query";

const API_LIST = {
  getBlogByAuthorAPI: "/api/blogs/get-blogs-by-author",
};

type GetBlogByAuthorIdProps = {
  pageNo: number;
  authorId: string;
  publishStatus: boolean;
};

const getBlogsByAuthor = async ({
  pageNo = 1,
  authorId,
  publishStatus,
}: GetBlogByAuthorIdProps): Promise<BlogsByAuthorResponse> => {
  // Fetches blogs by author with pagination
  const response = (await axiosClient.get(
    `${API_LIST.getBlogByAuthorAPI}?page=${pageNo}&authorId=${authorId}&publishStatus=${publishStatus?.toString()}`
  )) as BlogsByAuthorResponse;
  return response;
};

export const useGetBlogsByAuthor = ({
  authorId,
  publishStatus,
}: GetBlogByAuthorIdProps) => {
  // Using useInfiniteQuery to handle paginated queries
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["get-blogs-by-author", authorId, publishStatus],
    queryFn: ({ pageParam = 0 }) =>
      getBlogsByAuthor({
        pageNo: pageParam as number,
        authorId: authorId,
        publishStatus: publishStatus,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasNextPage
        ? lastPage.meta.currentPage + 1
        : undefined;
    },
  });
};
