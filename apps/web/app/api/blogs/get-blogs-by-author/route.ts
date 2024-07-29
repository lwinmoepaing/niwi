import { getBlogByAuthor } from "@/feats/blog/services/blog.service";
import { blogByAuthPaginationSchema } from "@/feats/blog/validations/blog.validation";
import { auth } from "@/libs/auth/next-auth";
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

    const { data: blogs, meta } = await getBlogByAuthor({
      authorId: data.authorId,
      page: data.page,
      publishStatus: data.publishStatus,
      userId: session?.user?.id,
    });

    return responseAPI({
      message: "Fetched blogs successfully.",
      statusCode: StatusCodes.OK,
      data: blogs,
      meta,
    });
  } catch (err) {
    let message = "Blog List Service is not currently available";
    if (err instanceof Error) message = err.message;

    return responseAPI({
      message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
