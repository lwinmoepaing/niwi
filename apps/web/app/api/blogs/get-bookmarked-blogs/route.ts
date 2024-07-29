import { getBookmarkedBlogs } from "@/feats/blog/services/blog.service";
import { bookmarkBlogPaginationSchema } from "@/feats/blog/validations/blog.validation";
import { auth } from "@/libs/auth/next-auth";
import { responseAPI } from "@/libs/response/response-helper";
import { generateMetaForPagination } from "@/libs/utils";
import { StatusCodes } from "http-status-codes";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const { success, data, error } = bookmarkBlogPaginationSchema.safeParse({
      ...queryParams,
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
        message: "Fetched bookmarked blogs successfully.",
        statusCode: StatusCodes.OK,
        data: [],
        meta: generateMetaForPagination({ page: 1, totalPages: 0 }),
      });
    }

    const { data: comments, meta } = await getBookmarkedBlogs({
      page: data.page,
      userId: session?.user?.id,
    });

    return responseAPI({
      message: "Fetched bookmarked blogs successfully.",
      statusCode: StatusCodes.OK,
      data: comments,
      meta,
    });
  } catch (err) {
    let message = "Blog's Bookmarked Blog Service is not currently available";
    if (err instanceof Error) message = err.message;

    return responseAPI({
      message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
