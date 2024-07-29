/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const responseError = <T = null, B = null>(
  message: string,
  errors?: T,
  data?: B
) => {
  return { success: false, errors, message, data };
};

export const responseSuccess = <T = null, B = any>(
  message: string,
  data?: T,
  errors?: B
) => {
  return { success: true, data, message, errors };
};

type ResponseApiProps = {
  message: string;
  statusCode: number;
};

type ResponseMeta = {
  currentPage: number;
  previousPage?: number | null;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export const responseAPI = <T = null, B = null>(
  res: ResponseApiProps & {
    data?: B;
    errors?: T;
    meta?: ResponseMeta;
  }
) => {
  return new NextResponse(
    JSON.stringify({
      message: res.message,
      data: res.data,
      errors: res.errors,
      meta: res.meta,
    }),
    {
      status: res.statusCode,
    }
  );
};
