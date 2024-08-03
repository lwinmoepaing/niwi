import { responseAPI } from "@/libs/response/response-helper";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import path from "path";

const checkStats = (path: string): Promise<fs.Stats> => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};

export async function GET(
  request: Request,
  { params }: { params: { images: string } }
) {
  const images = params.images;
  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      "images",
      "uploads",
      ...images
    );

    const stats = await checkStats(imagePath);
    if (!stats) {
      return responseAPI({
        message: "Not found Images.",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const responseHeader = new Headers(request.headers);
    const ext = path.extname(imagePath).substring(1);
    const mimeType = `image/${ext}`;
    responseHeader.set("Content-Type", mimeType);
    const stream = fs.createReadStream(imagePath);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Response(stream as any, { headers: responseHeader });
  } catch (_e) {
    return responseAPI({
      message: "Not found Images.",
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
}
