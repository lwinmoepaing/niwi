import { z } from "zod";

export const ProfileSizeType = z.enum(["full", "half", "sixty", "square"]);

export const ProfileLinkType = z.enum([
  "discord",
  "youtube",
  "github",
  "linkedin",
  "instagram",
  "spotify",
  "buymecoffee",
  "facebook",
  "twitter",
  "other",
]);

const profileGridCardSchema = z.object({
  id: z.string().trim().min(1, "Id is required"),
  type: ProfileLinkType,
  image: z.string().default(""),
  link: z.string().trim().min(1, "Link is required"),
  size: ProfileSizeType,
  title: z.string().trim().min(1, "Title is required"),
  youtubeInfo: z
    .object({
      subscribeCount: z.string().default(""),
      videoCount: z.string().default(""),
    })
    .optional(),
});

export const saveProfileSchema = z.object({
  userId: z.string().trim().min(1, "UserID is required"),
  name: z.string().trim().min(1, "Name is required"),
  shortLink: z.string().trim().min(3, "Short link is required."),
  backgroundImage: z.string().default(""),
  aboutMe: z.string().default(""),
  aboutMeJson: z.string().default(""),
  statusMessage: z.string().default(""),
  statusMessageJson: z.string().default(""),
  showStatusMessage: z.boolean(),

  gridProfile: z.array(profileGridCardSchema).default([]),
});

export type SaveProfileFormValues = z.infer<typeof saveProfileSchema>;
