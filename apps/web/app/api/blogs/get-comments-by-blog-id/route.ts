import { getCommentsByBlogId } from "@/feats/blog/services/blog.service";
import { blogCommentsByBlogIdPaginationSchema } from "@/feats/blog/validations/blog.validation";
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

    const { data: comments, meta } = await getCommentsByBlogId({
      page: data.page,
      blogId: data.blogId,
    });

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
