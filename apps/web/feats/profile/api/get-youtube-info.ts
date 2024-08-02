import axiosClient from "@/libs/api/axios-client";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { YoutubeResponse } from "@/types/profile-response";

export const getYoutubeInfo = async (channelId: string) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID || "";

    const response = (await axiosClient.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
    )) as YoutubeResponse;

    const item = response.items[0];

    if (item) {
      return responseSuccess("Successfully get youtube info", item);
    }

    return responseError("Successfully get youtube info", response);
  } catch (error) {
    console.log(error);
    return responseError((error as Error).message);
  }
};
