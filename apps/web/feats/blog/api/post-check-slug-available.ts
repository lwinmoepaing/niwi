import axiosClient from "@/libs/api/axios-client";
import { MutationConfig } from "@/libs/api/react-query";
import { CheckBlogStausResponse } from "@/types/blog-response";
import { useMutation } from "@tanstack/react-query";

const API_LIST = {
  checkSlashAvailable: "/api/blogs/check-slug",
};

type PostCheckSlugBlogProps = {
  blogId: string;
  slug: string;
};

const postCheckSlugAvailable = (
  props: PostCheckSlugBlogProps
): Promise<CheckBlogStausResponse> => {
  return axiosClient.post(`${API_LIST.checkSlashAvailable}`, props);
};

type UseCheckSlugAvailableOptions = {
  mutationConfig?: MutationConfig<typeof postCheckSlugAvailable>;
};

export const useCheckSlugAvailable = ({
  mutationConfig,
}: UseCheckSlugAvailableOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Handling Revalidation or something like that.
      // invalidate queries !!
      // -- other processing

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: postCheckSlugAvailable,
  });
};
