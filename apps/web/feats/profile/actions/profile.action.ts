"use server";

import { auth, sessionUpdate } from "@/libs/auth/next-auth";
import {
  responseError,
  responseSuccess,
} from "@/libs/response/response-helper";
import { saveProfile } from "../services/profile.service";
import {
  SaveProfileFormValues,
  saveProfileSchema,
} from "../validation/profile.validation";

export const saveProfileAction = async (
  _currentState: unknown,
  userData: SaveProfileFormValues
) => {
  try {
    const { error, data } = saveProfileSchema.safeParse(userData);
    if (error) {
      return responseError(error.message, error.format());
    }

    const session = await auth();
    if (!session?.user?.id) return responseError("No authentication data");

    const authorId = session.user.id;
    if (authorId !== data.userId)
      return responseError("You have no permission to update this user");

    const updatedProfile = await saveProfile({ ...data });

    if (!updatedProfile.success || !updatedProfile.data) {
      return responseError(updatedProfile.message);
    }

    return responseSuccess(
      "Successfully updated your profile.",
      updatedProfile.data
    );
  } catch (err) {
    if (err instanceof Error) {
      return responseError(err.message);
    }
  }
};

export const updateShortLinkAction = async (
  _currentState: unknown,
  shortLink: string
) => {
  return sessionUpdate({
    user: { shortLink },
  });
};
