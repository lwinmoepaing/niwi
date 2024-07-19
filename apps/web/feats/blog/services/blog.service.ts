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
    return responseSuccess(`Successfully fetched blog ${id}`, blog);
  } catch (e) {
    return responseError((e as Error).message);
  }
};
