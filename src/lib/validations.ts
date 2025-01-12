import { z } from "zod";

export const SignupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email("Invalid email address"),
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  gender: z.string().min(1, { message: "Required" }),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((str) => new Date(str)),
});
