import "server-only";

import prismaClient from "@/libs/db/prismaClient";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { nanoid } from "nanoid";
import { Blog, SingleBlog } from "@/types/blog-response";

const getUserSelectRelation = (userId: string) =>
  ({
    user: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
    reactions: {
      select: {
        heart: true,
        thumbsUp: true,
        thumbsDown: true,
      },
    },
    userBlogReaction: {
      where: {
        userId: userId,
      },
      select: {
        reaction: true,
        userId: true,
        blogId: true,
      },
    },
  }) as const;

type CreateBlogProps = {
  title: string;
  content: string;
  contentJson: string;
  userId: string;
};

export const createBlog = async (blogProps: CreateBlogProps) => {
  const { title, content, userId, contentJson } = blogProps;
  const uniqeID = nanoid();

  try {
    const [newBlog, newBlogReactions] = await prismaClient.$transaction(
      async (prisma) => {
        // Create Reactions associated with the new Blog
        const newBlogReactions = await prisma.blogReactions.create({
          data: {
            heart: 0,
            thumbsUp: 0,
            thumbsDown: 0,
          },
        });

        // Create New Blog
        const newBlog = await prisma.blog.create({
          data: {
            slug: uniqeID,
            title,
            content,
            contentJson,
            isPublished: false,
            userId,
            reactionsId: newBlogReactions.id,
          },
        });

        const blogWithRelations: Blog | null = await prisma.blog.findUnique({
          where: {
            id: newBlog.id,
          },

          include: getUserSelectRelation(userId),
        });

        return [blogWithRelations, newBlogReactions];
      }
    );

    return responseSuccess("Successfully created blog", {
      newBlog,
      newBlogReactions,
    });
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to create blog or reactions");
  }
};

export const getBlogById = async (id: string, userId?: string) => {
  try {
    const blog = await prismaClient.blog.findUnique({
      where: { id },
      include: userId ? getUserSelectRelation(userId) : undefined,
    });
    return responseSuccess(
      `Successfully fetched blog by ${id}`,
      blog as Blog | SingleBlog
    );
  } catch (e) {
    return responseError((e as Error).message);
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const blog = await prismaClient.blog.findUnique({ where: { slug } });
    return responseSuccess(
      `Successfully fetched blog by slug name ${slug}`,
      blog
    );
  } catch (e) {
    return responseError((e as Error).message);
  }
};

export const searchSimilarBySlug = async (slug: string) => {
  try {
    // Find all blogs with slugs starting with the base slug
    const blogs = await prismaClient.blog.count({
      where: {
        slug: {
          contains: `${slug}`,
        },
      },
    });

    const count = blogs;
    const suggestedSlug = count === 0 ? slug : `${slug}-${count + 1}`;

    return responseSuccess(
      `Suggested slug for ${slug} is ${suggestedSlug}`,
      suggestedSlug
    );
  } catch (e) {
    return responseError((e as Error).message);
  }
};

type SaveBlogProps = {
  title: string;
  blogId: string;
  content: string;
  contentJson: string;
  userId: string;
};

export const saveBlog = async (blogProps: SaveBlogProps) => {
  const { blogId, content, contentJson, userId, title } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    if (blog.userId !== userId)
      return responseError("User has no permission to update");

    const updatedBlog: Blog = await prismaClient.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
        contentJson,
      },
      include: getUserSelectRelation(userId),
    });

    return responseSuccess("Successfully save blog", updatedBlog);
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to save blog .");
  }
};

type PublishBlogProps = {
  blogId: string;
  title: string;
  slug: string;
  userId: string;
};

export const publishBlog = async (blogProps: PublishBlogProps) => {
  const { blogId, userId, slug, title } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    if (blog.userId !== userId)
      return responseError("User has no permission to update");

    // Checking Slug is available
    const { success: isSlugFound, data: blogBySlug } =
      await getBlogBySlug(slug);

    if (!isSlugFound || !blogBySlug || blogBySlug.id === blogId) {
      const updatedBlog: Blog = await prismaClient.blog.update({
        where: { id: blogId },
        include: getUserSelectRelation(userId),
        data: {
          title,
          slug,
          isPublished: true,
        },
      });
      return responseSuccess("Successfully publish blog", updatedBlog);
    }

    // When a slug is found and
    // the current blog ID is not the same as the blog retrieved by the slug
    const { data: suggest } = await searchSimilarBySlug(slug);

    return responseError("Slug is already used. Please re-generate the slug.", {
      suggest,
    });
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to publish blog", { suggest: "" });
  }
};

type ToggleFavoriteBlogProps = {
  blogId: string;
  userId: string;
  isFavorite: boolean;
};

export const updateFavoriteBlog = async (
  blogProps: ToggleFavoriteBlogProps
) => {
  const { blogId, userId, isFavorite } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    const defaultProps = {
      userId,
      blogId,
      reaction: "HEART",
    } as const;

    const resData = await prismaClient.$transaction(async (prisma) => {
      const searchUserBlogReaction = await prisma.userBlogReaction.findFirst({
        where: defaultProps,
      });

      // First time reaction for this blog
      if (!searchUserBlogReaction) {
        await prisma.userBlogReaction.create({
          data: defaultProps,
        });

        await prisma.blogReactions.update({
          where: { id: blog.reactionsId },
          data: { heart: { increment: 1 } },
        });

        return { blogId, userId, isFavorite };
      }

      // If user've already react for this blog
      if (isFavorite) {
        return { blogId, userId, isFavorite };
      }

      await prisma.userBlogReaction.delete({
        where: {
          id: searchUserBlogReaction.id,
        },
      });

      await prisma.blogReactions.update({
        where: { id: blog.reactionsId },
        data: { heart: { decrement: 1 } },
      });

      return { blogId, userId, isFavorite };
    });

    return responseSuccess("Successfully created blog", resData);
  } catch (error) {
    return responseError("Failed to favorite (or) unfavorite blog");
  }
};

type DeleteBlogProps = {
  blogId: string;
  userId: string;
};

export const deleteBlog = async (blogProps: DeleteBlogProps) => {
  const { blogId, userId } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    if (blog.userId !== userId)
      return responseError("User has no permission to update");

    const removedBlog = await prismaClient.$transaction(async (prisma) => {
      await prisma.blogComment.deleteMany({
        where: {
          blogId: blogId,
        },
      });

      await prisma.userBlogReaction.deleteMany({
        where: {
          blogId,
        },
      });

      const deletedBlog = await prisma.blog.delete({ where: { id: blogId } });

      if (deletedBlog) {
        await prisma.blogReactions.delete({
          where: { id: deletedBlog.reactionsId },
        });
      }

      return deletedBlog;
    });

    return responseSuccess("Blog is successfully deleted", removedBlog);
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to delete blog");
  }
};

type CreateBlogCommentProps = {
  userId: string;
  blogId: string;
  comment: string;
};

export const createBlogComment = async (
  commentProps: CreateBlogCommentProps
) => {
  const { blogId, userId, comment } = commentProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    const createdNewBlog = await prismaClient.blogComment.create({
      data: {
        blogId,
        userId,
        content: comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return responseSuccess("Comment is successfully created", createdNewBlog);
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to create comment blog");
  }
};

type EditedBlogCommentProps = CreateBlogCommentProps & {
  commentId: string;
};

export const updateBlogComment = async (
  commentProps: EditedBlogCommentProps
) => {
  const { blogId, userId, comment, commentId } = commentProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    if (userId !== blog.userId) return responseError("Not authorized");

    const updatedComment = await prismaClient.blogComment.update({
      where: {
        id: commentId,
      },
      data: {
        content: comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return responseSuccess("Comment is successfully updated.", updatedComment);
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to update comment");
  }
};
