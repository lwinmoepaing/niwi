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
