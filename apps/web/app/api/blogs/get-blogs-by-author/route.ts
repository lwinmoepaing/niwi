import { blogByAuthPaginationSchema } from "@/feats/blog/validations/blog.validation";
import { auth } from "@/libs/auth/next-auth";
import prismaClient from "@/libs/db/prismaClient";
import { responseAPI } from "@/libs/response/response-helper";
import { StatusCodes } from "http-status-codes";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const { success, data, error } = blogByAuthPaginationSchema.safeParse({
      ...queryParams,
      publishStatus: queryParams.publishStatus === "true",
    });

    if (!success) {
      return responseAPI({
        message: "Your request is bad request",
        statusCode: StatusCodes.BAD_REQUEST,
        errors: error.format(),
      });
    }

    const session = await auth();
    if (!session?.user?.id) {
      return responseAPI({
        message: "Your request is unathorized",
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    const LIMIT_COUNT = 5 as const;
    const page = data.page;
    const skip = (page - 1) * LIMIT_COUNT;

    // Get the total count of blogs
    const totalCount = await prismaClient.blog.count({
      where: {
        userId: data.authorId,
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

    const blogs = await prismaClient.blog.findMany({
      skip: skip,
      take: LIMIT_COUNT,
      where: {
        userId: data.authorId,
        isPublished: data.publishStatus,
      },
      include: {
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
            userId: session?.user?.id,
          },
          select: {
            reaction: true,
            userId: true,
            blogId: true,
          },
        },
      },
    });

    const meta = {
      currentPage: page,
      previousPage: page > 1 ? page - 1 : null,
      totalPage: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    } as const;

    return responseAPI({
      message: "Fetched blogs successfully",
      statusCode: StatusCodes.OK,
      data: blogs,
      meta,
    });
  } catch (err) {
    let message = "Blog list is not currently available";

    if (err instanceof Error) message = err.message;

    return responseAPI({
      message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
