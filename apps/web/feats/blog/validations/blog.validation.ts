import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  contentJson: z.string().min(1),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;
