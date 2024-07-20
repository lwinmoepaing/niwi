import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  contentJson: z.string().min(1),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export const saveBlogSchema = z.object({
  blogId: z.string().min(1),
  content: z.string().min(1),
  contentJson: z.string().min(1),
});

export type SaveBlogFormValues = z.infer<typeof saveBlogSchema>;

export const publishBlogSchema = z.object({
  blogId: z.string().min(1),
  isPublish: z.boolean(),
  title: z.string(),
  slug: z.string(),
  previewImage: z.string().optional(),
});

export type PublishBlogFormValues = z.infer<typeof publishBlogSchema>;
