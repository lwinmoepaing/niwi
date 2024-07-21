"use server";

import { auth } from "@/libs/auth/next-auth";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { createBlog, publishBlog, saveBlog } from "../services/blog.service";
import {
  CreateBlogFormValues,
  createBlogSchema,
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
      return responseError("", error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const newBlog = await createBlog({ ...data, userId: session.user.id });

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
      return responseError("", error.format());
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
      return responseError(publishedBlog.message);
    }

    return responseSuccess("Successfully saved your blog.", publishedBlog.data);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};
