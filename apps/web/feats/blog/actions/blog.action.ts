"use server";

import { auth } from "@/libs/auth/next-auth";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { revalidatePath } from "next/cache";
import {
  createBlog,
  publishBlog,
  saveBlog,
  updateFavoriteBlog,
} from "../services/blog.service";
import {
  CreateBlogFormValues,
  createBlogSchema,
  FavoriteBlogFormValues,
  favoriteBlogSchema,
  PublishBlogFormValues,
  publishBlogSchema,
  SaveBlogFormValues,
  saveBlogSchema,
} from "../validations/blog.validation";

export const createBlogAction = async (
  _currentState: unknown,
  blogData: CreateBlogFormValues
) => {
  try {
    const { error, data } = createBlogSchema.safeParse(blogData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const authorId = session.user.id;
    const newBlog = await createBlog({ ...data, userId: authorId });

    if (!newBlog.success) {
      return responseError(newBlog.message);
    }

    return responseSuccess("Successfully created your blog.", newBlog.data);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const saveBlogAction = async (
  _currentState: unknown,
  blogData: SaveBlogFormValues
) => {
  try {
    const { error, data } = saveBlogSchema.safeParse(blogData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const savedBlog = await saveBlog({
      ...data,
      userId: session.user.id,
    });

    if (!savedBlog.success) {
      return responseError(savedBlog.message);
    }

    return responseSuccess("Successfully saved your blog.", savedBlog.data);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const publishBlogAction = async (
  _currentState: unknown,
  blogData: PublishBlogFormValues
) => {
  try {
    const { error, data } = publishBlogSchema.safeParse(blogData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const publishedBlog = await publishBlog({
      ...data,
      userId: session.user.id,
    });

    if (!publishedBlog.success) {
      const suggest = publishedBlog.errors.suggest as string;
      return responseError(publishedBlog.message, { suggest });
    }

    revalidatePath("/dashboard/blogs/" + data.blogId);

    return responseSuccess("Successfully saved your blog.", publishedBlog.data);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const favoriteBlogAction = async (
  _currentState: unknown,
  blogData: FavoriteBlogFormValues
) => {
  try {
    const { error, data } = favoriteBlogSchema.safeParse(blogData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const updateStatus = await updateFavoriteBlog({
      blogId: data.blogId,
      userId: session.user.id,
      isFavorite: data.isFavorite,
    });

    if (updateStatus.success && updateStatus.data) {
      return responseSuccess(
        "Successfully updated favorite status on blog",
        updateStatus.data
      );
    }

    return responseError(updateStatus.message);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};
