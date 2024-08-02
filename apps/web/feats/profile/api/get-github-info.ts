import axiosClient from "@/libs/api/axios-client";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { GitHubProfileResponse } from "@/types/profile-response";

export const getGithubInfo = async (username: string) => {
  try {
    const gitResponse = (await axiosClient.get(
      `https://api.github.com/users/${username}`
    )) as GitHubProfileResponse;
    return responseSuccess("Successfully get github info", gitResponse);
  } catch (error) {
    console.log(error);
    return responseError((error as Error).message);
  }
};
