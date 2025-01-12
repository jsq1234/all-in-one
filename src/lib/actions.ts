"use server";

import { z } from "zod";
import { SignupSchema } from "./validations";

export type SignupInput = z.infer<typeof SignupSchema>;
export type FormState = {
  errors?: {
    email?: string[] | undefined;
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    gender?: string[] | undefined;
    dob?: string[] | undefined;
  };
  success?: boolean;
} | null; 

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 6000));

  // Server-side validation
  const result = SignupSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    dob: formData.get("dob"),
  });
  console.log("dob", formData.get("dob"));
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  console.log(result);

  // Simulate checking for existing email
  if (result.data.email === "test@example.com") {
    return {
      errors: {
        email: ["Email already exists"],
      },
      success: false,
    };
  }

  console.log("Return!");

  // Here you would typically create the user in your database
  return { success: true };
}
