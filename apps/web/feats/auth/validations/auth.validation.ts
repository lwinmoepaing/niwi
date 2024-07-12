import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .refine((password) => {
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, "Password must contain at least 1 special character and 1 uppercase letter"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirm !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Password do not match.",
      });
    }
  });

const baseSchema = z.object({
  name: z.string({ message: "Name is required." }).min(1),
  email: z.string().email(),
});

export const signUpFormSchema = baseSchema.and(passwordSchema);

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    resetPasswordKey: z.string().min(1),
  })
  .and(passwordSchema);

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const googleAuthSchema = z.object({
  email: z.string().email(),
  name: z.string({ message: "Name is required." }).min(1),
  picture: z.string({ message: "Image is required." }).min(1),
});

export const githubAuthSchema = z.object({
  id: z.number().min(1),
  email: z.string().email(),
  name: z.string({ message: "Name is required." }).min(1),
  avatar_url: z.string({ message: "Image is required." }).min(1),
});

export const facebookAuthSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string({ message: "Name is required." }).min(1),
});

export const twitterAuthSchema = z.object({
  data: z.object({
    id: z.string().min(1),
    name: z.string({ message: "Name is required." }).min(1),
    username: z.string({ message: "Name is required." }).min(1),
    profile_image_url: z.string({ message: "Image is required." }).min(1),
  }),
});
