import axiosClient from "@/libs/api/axios-client";
import { BlogsCommentsByBlogIdResponse } from "@/types/blog-response";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentByBlogIdQueryKey } from "../services/blog-query-cache.service";

const API_LIST = {
  getCommentsByBlogId: "/api/blogs/get-comments-by-blog-id",
};

type GetCommentsByBlodIdProps = {
  pageNo: number;
  blogId: string;
};

const getCommentsByBlogId = async ({
  pageNo = 1,
  blogId,
}: GetCommentsByBlodIdProps): Promise<BlogsCommentsByBlogIdResponse> => {
  const response = (await axiosClient.get(
    `${API_LIST.getCommentsByBlogId}?blogId=${blogId}&page=${pageNo}`
  )) as BlogsCommentsByBlogIdResponse;
  return response;
};

export const useGetCommentsByBlogId = ({
  blogId,
}: GetCommentsByBlodIdProps) => {
  // Using useInfiniteQuery to handle paginated queries
  return useInfiniteQuery({
    structuralSharing: (oldData, newData) =>
      oldData === newData ? oldData : newData,
    initialPageParam: 1,
    staleTime: 1000 * 60,
    queryKey: getCommentByBlogIdQueryKey(blogId),
    queryFn: ({ pageParam = 0 }) =>
      getCommentsByBlogId({
        pageNo: pageParam as number,
        blogId,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasNextPage
        ? lastPage.meta.currentPage + 1
        : undefined;
    },
  });
};
