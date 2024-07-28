"use server";

import { auth } from "@/libs/auth/next-auth";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { revalidatePath } from "next/cache";
import {
  createBlog,
  createBlogComment,
  deleteBlog,
  deleteBlogComment,
  publishBlog,
  saveBlog,
  updateBlogComment,
  updateFavoriteBlog,
} from "../services/blog.service";
import {
  CreateBlogCommentFormValues,
  createBlogCommentSchema,
  CreateBlogFormValues,
  createBlogSchema,
  deleteBlogByIdSchema,
  DeleteBlogCommentFormValues,
  deleteBlogCommentSchema,
  DeleteBlogFormValues,
  FavoriteBlogFormValues,
  favoriteBlogSchema,
  PublishBlogFormValues,
  publishBlogSchema,
  SaveBlogFormValues,
  saveBlogSchema,
  UpdateBlogCommentFormValues,
  updateBlogCommentSchema,
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

    return responseSuccess(
      "Successfully published your blog.",
      publishedBlog.data
    );
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

export const deleteBlogAction = async (
  _currentState: unknown,
  blogData: DeleteBlogFormValues
) => {
  try {
    const { error, data } = deleteBlogByIdSchema.safeParse(blogData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const deletedItem = await deleteBlog({
      blogId: data.blogId,
      userId: session.user.id,
    });

    if (deletedItem.success && deletedItem.data) {
      return responseSuccess(
        "Successfully deleted the blog.",
        deletedItem.data
      );
    }

    return responseError(deletedItem.message);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const createBlogCommentAction = async (
  _currentState: unknown,
  commentData: CreateBlogCommentFormValues
) => {
  try {
    const { error, data } = createBlogCommentSchema.safeParse(commentData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const newComment = await createBlogComment({
      blogId: data.blogId,
      userId: session.user.id,
      comment: data.comment,
    });

    if (newComment.success && newComment.data) {
      return responseSuccess(
        "Successfully created the comment.",
        newComment.data
      );
    }

    return responseError(newComment.message);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const updateBlogCommentAction = async (
  _currentState: unknown,
  commentData: UpdateBlogCommentFormValues
) => {
  try {
    const { error, data } = updateBlogCommentSchema.safeParse(commentData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const updatedData = await updateBlogComment({
      userId: session?.user?.id,
      ...data,
    });

    if (updatedData.success && updatedData.data) {
      return responseSuccess(
        "Successfully created the comment.",
        updatedData.data
      );
    }

    return responseError(updatedData.message);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const deleteBlogCommentAction = async (
  _currentState: unknown,
  commentData: DeleteBlogCommentFormValues
) => {
  try {
    const { error, data } = deleteBlogCommentSchema.safeParse(commentData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const deletedComment = await deleteBlogComment({
      userId: session.user.id,
      commentId: data.commentId,
    });

    if (deletedComment.success && deletedComment.data) {
      return responseSuccess(
        "Successfully deleted the comment.",
        deletedComment.data
      );
    }

    return responseError(deletedComment.message);
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};
