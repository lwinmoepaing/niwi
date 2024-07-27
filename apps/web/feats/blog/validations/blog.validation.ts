import { z } from "zod";

const isValidObjectId = (val: string): boolean => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(val);
};

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  contentJson: z.string().min(1, "Content's JSON is required"),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export const saveBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  blogId: z.string().min(1, "BlogID is required"),
  content: z.string().min(1, "Content is required"),
  contentJson: z.string().min(1, "Content's JSON is required"),
});

export type SaveBlogFormValues = z.infer<typeof saveBlogSchema>;

export const publishBlogSchema = z.object({
  blogId: z.string().min(1, "BlogID is required"),
  isPublish: z.boolean({ message: "Publish status is required" }),
  title: z.string().trim().min(1, "Title is required"),
  subTitle: z.string().trim().min(1, "Subtitle is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")),
  previewImage: z.string().optional(),
});

export type PublishBlogFormValues = z.infer<typeof publishBlogSchema>;

export const checkBlogByStatusSchema = z.object({
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid Blog ID.",
    }),
  slug: z.string().min(1, "Slug is required"),
});

export const favoriteBlogSchema = z.object({
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid Blog ID.",
    }),
  isFavorite: z.boolean({ message: "Favorite is required" }),
});

export type FavoriteBlogFormValues = z.infer<typeof favoriteBlogSchema>;

export const blogByAuthPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "1") || 1),
  authorId: z
    .string()
    .min(1, "Author ID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid Author ID.",
    }),
  publishStatus: z.boolean(),
});

export const blogCommentsByBlogIdPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "1") || 1),
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid Blog ID.",
    }),
});

export const deleteBlogByIdSchema = z.object({
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid BlogID.",
    }),
});

export type DeleteBlogFormValues = z.infer<typeof deleteBlogByIdSchema>;

export const updateBlogCommentSchema = z.object({
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid BlogID.",
    }),
  comment: z.string().trim().min(1, "Comment is required"),
});

export type UpdateBlogCommentFormValues = z.infer<
  typeof updateBlogCommentSchema
>;
