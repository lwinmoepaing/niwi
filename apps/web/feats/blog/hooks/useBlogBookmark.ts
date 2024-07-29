"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { bookmarkBlogAction } from "../actions/blog.action";
import {
  BookmarkBlogFormValues,
  bookmarkBlogSchema,
} from "../validations/blog.validation";

const delay = 300;

function useBlogBookmark({
  blogId,
  isBookmark: parentIsBookmark,
  currentAuthId,
}: {
  blogId: string;
  isBookmark: boolean;
  currentAuthId: string;
}) {
  const [clickCount, setClickCount] = useState<number>(0);

  const [bookmarkBlogResponse, dispatchBookmarkBlog] = useActionState(
    bookmarkBlogAction,
    undefined
  );

  const [optimisticBookmark, setOptimisticBookmark] =
    useState<boolean>(parentIsBookmark);

  const { handleSubmit, reset, getValues } = useForm<BookmarkBlogFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(bookmarkBlogSchema),
    defaultValues: {
      blogId,
      isBookmark: parentIsBookmark,
    },
  });

  useEffect(() => {
    if (bookmarkBlogResponse?.success === true) {
      // toast.success(bookmarkBlogResponse.message);

      if (bookmarkBlogResponse.data) {
        reset(
          {
            blogId,
            isBookmark: bookmarkBlogResponse.data.isBookmark,
          },
          { keepDefaultValues: false }
        );

        setOptimisticBookmark(bookmarkBlogResponse.data.isBookmark);

        // updateFavoriteBlogQueryCacheUpdate({
        //   blogId: bookmarkBlogResponse.data.blogId,
        //   userId: currentAuthId,
        //   isFavorite: bookmarkBlogResponse.data.isFavorite,
        // });
      }
      return;
    }

    if (bookmarkBlogResponse?.success === false) {
      toast.error(bookmarkBlogResponse.message);
      const currentValue = getValues("isBookmark");
      setOptimisticBookmark(currentValue);
      return;
    }
  }, [bookmarkBlogResponse, currentAuthId]);

  const submit = useCallback(() => {
    const click = handleSubmit(async (values: BookmarkBlogFormValues) => {
      dispatchBookmarkBlog({ ...values, isBookmark: optimisticBookmark });
    });

    click();
  }, [dispatchBookmarkBlog, optimisticBookmark]);

  const onClickBookmark = useCallback(async () => {
    setOptimisticBookmark((prev) => {
      return !prev;
    });
    setClickCount((prev) => prev + 1);
  }, [parentIsBookmark]);

  // Debounce for 300 miliseconds
  useEffect(() => {
    if (clickCount <= 0) return;

    const handler = setTimeout(() => {
      submit();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [clickCount, optimisticBookmark]);

  return {
    isBookmark: optimisticBookmark,
    onClickBookmark,
  };
}
export default useBlogBookmark;
