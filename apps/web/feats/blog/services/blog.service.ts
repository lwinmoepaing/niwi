import "server-only";

import prismaClient from "@/libs/db/prismaClient";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { nanoid } from "nanoid";
import {
  Blog,
  BookmarkBlog,
  PublishedBlog,
  SingleBlog,
} from "@/types/blog-response";
import { auth } from "@/libs/auth/next-auth";
import { generateMetaForPagination } from "@/libs/utils";
import config from "@/config";

export const serializeSelectorField = () => {
  return {
    id: true,
    slug: true,
    subTitle: true,
    title: true,
    isPublished: true,
    previewImage: true,
    userId: true,
    reactionsId: true,
    createdAt: true,
    updatedAt: true,
  } as const;
};

export const getUserSelectRelation = (userId: string) =>
  ({
    user: {
      select: {
        id: true,
        name: true,
        image: true,
        shortLink: true,
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

    _count: {
      select: {
        blogComments: true,
        blogBookmarks: {
          where: {
            userId: userId,
          },
        },
      },
    },
  }) as const;

export const getUserSelectRelationWithoutAuth = () =>
  ({
    user: {
      select: {
        id: true,
        name: true,
        image: true,
        shortLink: true,
      },
    },
    reactions: {
      select: {
        heart: true,
        thumbsUp: true,
        thumbsDown: true,
      },
    },

    _count: {
      select: {
        blogComments: true,
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
    const session = await auth();
    const userID = session?.user?.id;
    const blog = (await prismaClient.blog.findUnique({
      where: { slug },
      include: userID
        ? getUserSelectRelation(userID)
        : getUserSelectRelationWithoutAuth(),
    })) as PublishedBlog;

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

    if (!success || !blog) return responseError("Blog is not found");

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
    return responseError("Failed to save blog .");
  }
};

type PublishBlogProps = {
  blogId: string;
  title: string;
  slug: string;
  userId: string;
  subTitle: string;
};

export const publishBlog = async (blogProps: PublishBlogProps) => {
  const { blogId, userId, slug, title, subTitle } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog is not found");

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
          subTitle,
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

    if (!success || !blog) return responseError("Blog is not found");

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

    if (!success || !blog) return responseError("Blog is not found");

    if (blog.userId !== userId)
      return responseError("User has no permission to update");

    const removedBlog = await prismaClient.$transaction(async (prisma) => {
      await prisma.blogComment.deleteMany({
        where: { blogId },
      });

      await prisma.userBlogReaction.deleteMany({
        where: { blogId },
      });

      await prisma.userBlogBookmark.deleteMany({
        where: { blogId },
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
    return responseError("Failed to delete blog");
  }
};

export const getCommentById = async (commentId: string) => {
  try {
    const comment = await prismaClient.blogComment.findUnique({
      where: { id: commentId },
    });
    return responseSuccess(`Successfully fetched comment.`, comment);
  } catch (e) {
    return responseError((e as Error).message);
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

    if (!success || !blog) return responseError("Blog is not found");

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

    if (!success || !blog) return responseError("Blog is not found");

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
    return responseError("Failed to update comment");
  }
};

type DeleteBlogCommentProps = {
  userId: string;
  commentId: string;
};

export const deleteBlogComment = async (blogProps: DeleteBlogCommentProps) => {
  const { commentId, userId } = blogProps;

  try {
    const { success, data: comment } = await getCommentById(commentId);

    if (!success || !comment) return responseError("Comment is not found");

    if (comment.userId !== userId)
      return responseError("User has no permission to delete");

    const removedBlog = await prismaClient.blogComment.delete({
      where: { id: comment.id },
    });

    if (removedBlog) {
      return responseSuccess("Comment is successfully deleted", removedBlog);
    }

    return responseError("Failed to delete comment");
  } catch (error) {
    return responseError("Failed to delete comment");
  }
};

type UpdateBookmarkBlogProps = {
  blogId: string;
  userId: string;
  isBookmark: boolean;
};

export const updateBookMarkBlog = async (
  blogProps: UpdateBookmarkBlogProps
) => {
  const { blogId, userId, isBookmark } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog is not found");

    const defaultProps = {
      userId,
      blogId,
    } as const;

    const resData = await prismaClient.$transaction(async (prisma) => {
      const searchUserBlogBookmark = await prisma.userBlogBookmark.findFirst({
        where: defaultProps,
      });

      // First time reaction for this blog
      if (!searchUserBlogBookmark) {
        const newBookmark = await prisma.userBlogBookmark.create({
          data: defaultProps,
          include: {
            blog: {
              select: {
                ...serializeSelectorField(),
                ...getUserSelectRelation(userId),
              },
            },
          },
        });

        return { blogId, userId, isBookmark, bookmarkBlog: newBookmark };
      }

      if (isBookmark) {
        return { blogId, userId, isBookmark, bookmarkBlog: null };
      }

      await prisma.userBlogBookmark.delete({
        where: {
          id: searchUserBlogBookmark.id,
        },
      });

      return { blogId, userId, isBookmark, bookmarkBlog: null };
    });
    return responseSuccess("Successfully created blog", resData);
  } catch (error) {
    return responseError("Failed to favorite (or) unfavorite blog");
  }
};

type GetBlogByAuthorIdProps = {
  authorId: string;
  page: number;
  publishStatus: boolean;
  userId?: string;
};

export const getBlogByAuthor = async ({
  authorId,
  page,
  publishStatus,
  userId,
}: GetBlogByAuthorIdProps) => {
  const LIMIT_COUNT = 5 as const;
  const skip = (page - 1) * LIMIT_COUNT;

  const totalCount = await prismaClient.blog.count({
    where: {
      userId: authorId,
      isPublished: publishStatus,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

  const blogs = await prismaClient.blog.findMany({
    skip: skip,
    take: LIMIT_COUNT,
    where: {
      userId: authorId,
      isPublished: publishStatus,
    },
    orderBy: { createdAt: "desc" },
    select: userId
      ? {
          ...serializeSelectorField(),
          ...getUserSelectRelation(userId),
        }
      : {
          ...serializeSelectorField(),
          ...getUserSelectRelationWithoutAuth(),
        },
  });

  const meta = generateMetaForPagination({ page, totalPages });

  return {
    data: blogs,
    meta,
  };
};

type GetCommentsByBlogIdProps = {
  page: number;
  blogId: string;
};

export const getCommentsByBlogId = async ({
  page,
  blogId,
}: GetCommentsByBlogIdProps) => {
  const LIMIT_COUNT = 8 as const;
  const skip = (page - 1) * LIMIT_COUNT;

  const totalCount = await prismaClient.blogComment.count({
    where: {
      blogId: blogId,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

  const comments = await prismaClient.blogComment.findMany({
    skip: skip,
    take: LIMIT_COUNT,
    where: { blogId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const meta = generateMetaForPagination({ page, totalPages });

  return {
    meta,
    data: comments,
  };
};

type GetBookmarkedBlogsProps = {
  page: number;
  userId: string;
};

export const getBookmarkedBlogs = async ({
  page,
  userId,
}: GetBookmarkedBlogsProps) => {
  const LIMIT_COUNT = 8 as const;
  const skip = (page - 1) * LIMIT_COUNT;

  const totalCount = await prismaClient.userBlogBookmark.count({
    where: {
      userId,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

  const comments = (await prismaClient.userBlogBookmark.findMany({
    skip: skip,
    take: LIMIT_COUNT,
    where: { userId },
    include: {
      blog: {
        select: {
          ...serializeSelectorField(),
          ...getUserSelectRelation(userId),
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })) as BookmarkBlog[];

  const meta = generateMetaForPagination({ page, totalPages });

  return {
    meta,
    data: comments,
  };
};

export const getBlogCountByAuthor = (authorId: string) => {
  return prismaClient.blog.count({
    where: {
      userId: authorId,
    },
  });
};

export const checkAvailableBlogs = () => {
  return config.dbUrl?.length > 0;
};

export const getLast3Blogs = async (userId?: string) => {
  const blogs = await prismaClient.blog.findMany({
    where: {
      isPublished: true,
    },
    orderBy: { createdAt: "desc" },
    select: userId
      ? {
          ...serializeSelectorField(),
          ...getUserSelectRelation(userId),
        }
      : {
          ...serializeSelectorField(),
          ...getUserSelectRelationWithoutAuth(),
        },
  });

  return blogs;
};
