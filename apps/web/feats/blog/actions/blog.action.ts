"use server";

import { auth } from "@/libs/auth/next-auth";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { createBlog } from "../services/blog.service";
import {
  CreateBlogFormValues,
  createBlogSchema,
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

    return responseSuccess("Success", newBlog.data);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};
