import { z } from "zod";

// Define Zod schema for pagination
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val || "1") || 1),
});

export const checkIsValidPaginationParams = (searchParams: URLSearchParams) => {
  const queryParams = Object.fromEntries(searchParams.entries());
  const result = paginationSchema.safeParse(queryParams);
  return result;
};
