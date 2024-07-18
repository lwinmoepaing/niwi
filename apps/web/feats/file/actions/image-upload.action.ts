"use server";

import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { File } from "buffer";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { z } from "zod";
import { imageUploadSchema } from "../validation/image-upload.validation";

export const onUploadImageAction = async (form: FormData) => {
  const image = form.get("image") as File | null;

  if (!image) {
    throw new Error("No file uploaded");
  }

  // Validate the file using Zod
  try {
    imageUploadSchema.parse({ image });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map((err) => err.message).join(", ");
      return responseError(message);
    } else {
      return responseError("Invalid file format");
    }
  }

  const uniqueId = nanoid();
  const imageName = `${uniqueId}_${image.name}`;
  const uploadDir = path.join(process.cwd(), "public/images/uploads");
  const filePath = path.join(uploadDir, `${imageName}`);

  // Ensure the upload directory exists
  await fs.mkdir(uploadDir, { recursive: true });
  const fileBuffer = Buffer.from(await image.arrayBuffer());

  await fs.writeFile(filePath, fileBuffer);

  return responseSuccess("File uploaded successfully", {
    path: `/images/uploads/${imageName}`,
  });
};
