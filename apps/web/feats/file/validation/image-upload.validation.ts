import { z } from "zod";

export const imageUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image file size must be less than 5MB",
    }),
});
