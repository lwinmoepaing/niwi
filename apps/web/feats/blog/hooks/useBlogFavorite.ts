"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { favoriteBlogAction } from "../actions/blog.action";
import {
  FavoriteBlogFormValues,
  favoriteBlogSchema,
} from "../validations/blog.validation";
import { updateFavoriteBlogQueryCacheUpdate } from "../services/blog-query-cache.service";

const countCalculation = (
  parentFav: boolean,
  parentCount: number,
  nextFav: boolean
) => {
  if (parentFav) {
    return !nextFav ? parentCount - 1 : parentCount;
  } else {
    return nextFav ? parentCount + 1 : parentCount;
  }
};

const delay = 300;

function useBlogFavorite({
  blogId,
  isFavorite: parentIsFav,
  favoriteCount,
  currentAuthId,
}: {
  blogId: string;
  isFavorite: boolean;
  favoriteCount: number;
  currentAuthId: string;
}) {
  const [clickCount, setClickCount] = useState<number>(0);

  const [favoriteBlogResponse, dispatchFavoriteBlog] = useActionState(
    favoriteBlogAction,
    undefined
  );

  const [optimisticFav, setOptimisticFav] = useState<boolean>(parentIsFav);
  const [optimisticFavCount, setOptimisticFavCount] =
    useState<number>(favoriteCount);

  const { handleSubmit, reset, getValues } = useForm<FavoriteBlogFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(favoriteBlogSchema),
    defaultValues: {
      blogId,
      isFavorite: parentIsFav,
    },
  });

  useEffect(() => {
    if (favoriteBlogResponse?.success === true) {
      // toast.success(favoriteBlogResponse.message);

      if (favoriteBlogResponse.data) {
        const count = countCalculation(
          parentIsFav,
          favoriteCount,
          favoriteBlogResponse.data.isFavorite
        );
        reset(
          {
            blogId,
            isFavorite: favoriteBlogResponse.data.isFavorite,
          },
          { keepDefaultValues: false }
        );

        setOptimisticFav(favoriteBlogResponse.data.isFavorite);
        setOptimisticFavCount(count);

        updateFavoriteBlogQueryCacheUpdate({
          blogId: favoriteBlogResponse.data.blogId,
          userId: currentAuthId,
          count,
          isFavorite: favoriteBlogResponse.data.isFavorite,
        });
      }
      return;
    }

    if (favoriteBlogResponse?.success === false) {
      toast.error(favoriteBlogResponse.message);
      const currentValue = getValues("isFavorite");
      setOptimisticFav(currentValue);
      setOptimisticFavCount(
        countCalculation(parentIsFav, favoriteCount, currentValue)
      );
      return;
    }
  }, [favoriteBlogResponse, favoriteCount, currentAuthId]);

  const submit = useCallback(() => {
    const click = handleSubmit(async (values: FavoriteBlogFormValues) => {
      dispatchFavoriteBlog({ ...values, isFavorite: optimisticFav });
    });

    click();
  }, [dispatchFavoriteBlog, optimisticFav]);

  const onClickFavorite = useCallback(async () => {
    setOptimisticFav((prev) => {
      setOptimisticFavCount(() =>
        countCalculation(parentIsFav, favoriteCount, !prev)
      );
      return !prev;
    });
    setClickCount((prev) => prev + 1);
  }, [favoriteCount, parentIsFav]);

  // Debounce for 300 miliseconds
  useEffect(() => {
    if (clickCount <= 0) return;

    const handler = setTimeout(() => {
      submit();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [clickCount, optimisticFav]);

  return {
    favorite: optimisticFav,
    favCount: optimisticFavCount,
    onClickFavorite,
  };
}
export default useBlogFavorite;
