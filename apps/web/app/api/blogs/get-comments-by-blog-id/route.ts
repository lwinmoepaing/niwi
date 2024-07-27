import { blogCommentsByBlogIdPaginationSchema } from "@/feats/blog/validations/blog.validation";
import prismaClient from "@/libs/db/prismaClient";
import { responseAPI } from "@/libs/response/response-helper";
import { StatusCodes } from "http-status-codes";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const { success, data, error } =
      blogCommentsByBlogIdPaginationSchema.safeParse({
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

    const LIMIT_COUNT = 8 as const;
    const page = data.page;
    const skip = (page - 1) * LIMIT_COUNT;

    // Get the total count of comments
    const totalCount = await prismaClient.blogComment.count({
      where: {
        blogId: data.blogId,
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / LIMIT_COUNT);

    const comments = await prismaClient.blogComment.findMany({
      skip: skip,
      take: LIMIT_COUNT,
      where: {
        blogId: data.blogId,
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
      orderBy: {
        createdAt: "desc",
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
      message: "Fetched comments successfully.",
      statusCode: StatusCodes.OK,
      data: comments,
      meta,
    });
  } catch (err) {
    let message = "Blog's Comment Service is not currently available";
    if (err instanceof Error) message = err.message;

    return responseAPI({
      message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
