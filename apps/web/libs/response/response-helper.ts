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
export const responseAPI = <T = null, B = null>(
  res: ResponseApiProps & {
    data?: B;
    errors?: T;
  }
) => {
  return new NextResponse(
    JSON.stringify({
      message: res.message,
      data: res.data,
      errors: res.errors,
    }),
    {
      status: res.statusCode,
    }
  );
};
