import axiosClient from "@/libs/api/axios-client";
import { QueryConfig } from "@/libs/api/react-query";
import { SplashResponse } from "@/types/splash-response";
import { queryOptions, useQuery } from "@tanstack/react-query";

const API_LIST = {
  getUnsplashImages: "https://api.unsplash.com/search/photos",
};

type GetUnsplashProps = {
  pageNo: number;
  search: string;
};

const getUnsplashImage = ({
  pageNo,
  search,
}: GetUnsplashProps): Promise<SplashResponse> => {
  const MAX_IMAGE = 9;
  const CLIENT_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  return axiosClient.get(
    `${API_LIST.getUnsplashImages}?query=${search}&page=${pageNo}&per_page=${MAX_IMAGE}&client_id=${CLIENT_KEY}`
  );
};

export const getUnsplashImageQueryOptions = (data: GetUnsplashProps) => {
  return queryOptions({
    queryKey: ["unsplash-image", data.pageNo, data.search],
    queryFn: () => getUnsplashImage(data),
    enabled: !!data.search,
  });
};

type UseUnsplashImageOptions = {
  queryConfig?: QueryConfig<typeof getUnsplashImageQueryOptions>;
} & GetUnsplashProps;

export const useUnsplashImages = ({
  pageNo,
  search,
  queryConfig,
}: UseUnsplashImageOptions) => {
  return useQuery({
    ...getUnsplashImageQueryOptions({ pageNo, search }),
    ...queryConfig,
  });
};
