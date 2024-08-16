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
  estimateTime: z.string().min(1, "Estimate time is required"),
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
    .transform((val) => {
      const number = parseInt(val || "1");
      return number && number >= 0 ? number : 1;
    }),
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
    .transform((val) => {
      const number = parseInt(val || "1");
      return number && number >= 0 ? number : 1;
    }),
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
  commentId: z
    .string()
    .min(1, "CommentID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid CommentID.",
    }),
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

export const createBlogCommentSchema = z.object({
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid BlogID.",
    }),
  comment: z.string().trim().min(1, "Comment is required"),
});

export type CreateBlogCommentFormValues = z.infer<
  typeof createBlogCommentSchema
>;

export const deleteBlogCommentSchema = z.object({
  userId: z
    .string()
    .min(1, "Author ID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid Author ID.",
    }),
  commentId: z
    .string()
    .min(1, "CommentID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid CommentID.",
    }),
});

export type DeleteBlogCommentFormValues = z.infer<
  typeof deleteBlogCommentSchema
>;

export const bookmarkBlogPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => {
      const number = parseInt(val || "1");
      return number && number >= 0 ? number : 1;
    }),
});

export const bookmarkBlogSchema = z.object({
  blogId: z
    .string()
    .min(1, "BlogID is required")
    .refine((val) => isValidObjectId(val), {
      message: "Invalid Blog ID.",
    }),
  isBookmark: z.boolean({ message: "Bookmark is required" }),
});

export type BookmarkBlogFormValues = z.infer<typeof bookmarkBlogSchema>;
