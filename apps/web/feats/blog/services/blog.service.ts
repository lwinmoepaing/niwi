import "server-only";

import prismaClient from "@/libs/db/prismaClient";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { nanoid } from "nanoid";

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

        return [newBlog, newBlogReactions];
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

export const getBlogById = async (id: string) => {
  try {
    const blog = await prismaClient.blog.findUnique({ where: { id } });
    return responseSuccess(`Successfully fetched blog by ${id}`, blog);
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

type SaveBlogProps = {
  blogId: string;
  content: string;
  contentJson: string;
  userId: string;
};

export const saveBlog = async (blogProps: SaveBlogProps) => {
  const { blogId, content, contentJson, userId } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    if (blog.userId !== userId)
      return responseError("User has no permission to update");

    const updatedBlog = await prismaClient.blog.update({
      where: { id: blogId },
      data: {
        content,
        contentJson,
      },
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
  const { blogId, userId, slug } = blogProps;

  try {
    const { success, data: blog } = await getBlogById(blogId);

    if (!success || !blog) return responseError("Blog not found");

    if (blog.userId !== userId)
      return responseError("User has no permission to update");

    // Checking Slug is available
    const { success: isSlugFound, data: blogBySlug } =
      await getBlogBySlug(slug);

    if (!isSlugFound || !blogBySlug || blogBySlug.id === blogId) {
      const updatedBlog = await prismaClient.blog.update({
        where: { id: blogId },
        data: { ...blogProps, isPublished: true },
      });
      return responseSuccess("Successfully publish blog", updatedBlog);
    }

    // When a slug is found and
    // the current blog ID is not the same as the blog retrieved by the slug
    return responseError("Slug is already used. Please re-generate the slug.");
  } catch (error) {
    console.error("Transaction failed: ", error);
    return responseError("Failed to publish blog");
  }
};
