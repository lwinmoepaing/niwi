import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fistLetterCapitalize(letter: string) {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

export function checkPageNoIsValid(page: string | string[] | undefined) {
  const pageNumberSchema = z.coerce.number().int().positive().optional();
  const parsedPage = pageNumberSchema.safeParse(page);
  if (!parsedPage.success) throw new Error("Invalid Page Number");
  return parsedPage.data || 1;
}

interface PaginateMeta {
  currentPage: number;
  previousPage?: number | null;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function generateMetaForPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}): PaginateMeta {
  return {
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    totalPage: totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function getPagniationPath({
  page,
  limitCount,
  totalCount,
  link,
}: {
  page: number;
  limitCount: number;
  totalCount: number;
  link: string;
}) {
  const previousPath = page > 1 ? `${link}?page=${page - 1}` : "";
  const nextPath =
    totalCount > limitCount * page ? `${link}?page=${page + 1}` : "";

  return {
    previousPath,
    nextPath,
  };
}

interface PaginationProps {
  page: number;
  limitCount: number;
  totalCount: number;
}

interface PaginationResponse {
  nextPage: boolean;
  previousPage: boolean;
}

export function checkNextPageAndPreviousPage(
  props: PaginationProps
): PaginationResponse {
  const { page, limitCount, totalCount } = props;
  const totalPages = Math.ceil(totalCount / limitCount);

  return {
    nextPage: page < totalPages,
    previousPage: page > 1,
  };
}
