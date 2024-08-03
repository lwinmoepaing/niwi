import "server-only";

import prismaClient from "@/libs/db/prismaClient";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { UserProfileResponse } from "@/types/profile-response";

export const getUserById = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({ where: { id } });
    return responseSuccess(`Successfully fetched User`, user);
  } catch (e) {
    return responseError((e as Error).message);
  }
};

export const gerUserByShortLink = async (shortLink: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { shortLink },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        shortLink: true,
        userProfileId: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
      },
    });

    return responseSuccess(
      `Successfully fetched User by ShortLink`,
      user as UserProfileResponse
    );
  } catch (e) {
    console.log(e);
    return responseError((e as Error).message);
  }
};

type ProfileLinkCard = {
  id: string;
  type: string;
  image: string;
  link: string;
  size: string;
  title: string;
  youtubeInfo?: {
    subscribeCount: string;
    videoCount: string;
  };
};

type SaveProfileProps = {
  userId: string;
  shortLink: string;
  backgroundImage: string;

  aboutMe: string;
  aboutMeJson: string;

  statusMessage: string;
  statusMessageJson: string;
  showStatusMessage: boolean;

  gridProfile: ProfileLinkCard[];
};

export const saveProfile = async (profileData: SaveProfileProps) => {
  try {
    const { success, data: user } = await getUserById(profileData.userId);
    if (!success || !user) return responseError("User is not found");

    // Checking Short Link is Already Exists
    const { success: shortLinkSuccess, data: shortLinkData } =
      await gerUserByShortLink(profileData.shortLink);

    if (
      shortLinkSuccess &&
      shortLinkData &&
      shortLinkData.id !== profileData.userId
    ) {
      return responseError("Shortlink is already exists");
    }

    const resData = await prismaClient.$transaction(async (prisma) => {
      await prisma.userProfile.update({
        where: { id: user.userProfileId },
        data: {
          backgroundImage: profileData.backgroundImage,
          aboutMe: profileData.aboutMe,
          aboutMeJson: profileData.aboutMeJson,
          statusMessage: profileData.statusMessage,
          statusMessageJson: profileData.statusMessageJson,
          showStatusMessage: profileData.showStatusMessage,
          gridProfile: profileData.gridProfile ?? [],
        },
      });

      const udpatedUser = await prisma.user.update({
        where: { id: profileData.userId },
        data: {
          shortLink: profileData.shortLink,
        },
        include: {
          profile: true,
        },
      });

      return udpatedUser;
    });

    return responseSuccess("Successfully save user", resData);
  } catch (error) {
    console.log(error);
    return responseError("Failed to save user .");
  }
};
