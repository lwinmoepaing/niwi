import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  contentJson: z.string().min(1, "Content's JSON is required"),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export const saveBlogSchema = z.object({
  blogId: z.string().min(1, "BlogID is required"),
  content: z.string().min(1, "Content is required"),
  contentJson: z.string().min(1, "Content's JSON is required"),
});

export type SaveBlogFormValues = z.infer<typeof saveBlogSchema>;

export const publishBlogSchema = z.object({
  blogId: z.string().min(1, "BlogID is required"),
  isPublish: z.boolean(),
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .transform((val) => val.toLowerCase().replace(/\s+/g, "-")),
  previewImage: z.string().optional(),
});

export type PublishBlogFormValues = z.infer<typeof publishBlogSchema>;

export const checkBlogByStatusSchema = z.object({
  blogId: z.string().min(1, "BlogID is required"),
  slug: z.string().min(1, "Slug is required"),
});
