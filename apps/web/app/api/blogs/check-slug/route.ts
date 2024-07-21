import { getBlogById, getBlogBySlug } from "@/feats/blog/services/blog.service";
import { checkBlogByStatusSchema } from "@/feats/blog/validations/blog.validation";
import { responseAPI } from "@/libs/response/response-helper";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    const { blogId, slug } = await req.json();
    const { error } = checkBlogByStatusSchema.safeParse({ blogId, slug });

    if (error) {
      return responseAPI({
        message: error.message,
        errors: error.format(),
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    const { success, data: blog } = await getBlogById(blogId);
    if (!success || !blog) {
      return responseAPI({
        message: "Not found Blog.",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const { success: isSlugFound, data: blogBySlug } =
      await getBlogBySlug(slug);

    if (!isSlugFound || !blogBySlug) {
      return responseAPI({
        message: "Slug is available.",
        statusCode: StatusCodes.OK,
      });
    }

    if (blogBySlug.id === blogId) {
      return responseAPI({
        message: "Slug is already applied.",
        statusCode: StatusCodes.OK,
      });
    }

    return responseAPI({
      message: "Slug is not available",
      statusCode: StatusCodes.CONFLICT,
    });
  } catch (err) {
    let message = "Slug Checking service is not available";

    if (err instanceof Error) message = err.message;

    return responseAPI({
      message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
