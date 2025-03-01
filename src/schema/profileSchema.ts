import { z } from "zod";

export const EditProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  bio: z.string().min(3, { message: "Must be at least 3 characters long" }),
  photo: z
    .custom<File | null>((file) => file instanceof File || file === null, {
      message: "Please upload a valid photo"
    })
    .optional()
});

export type ProfileFormData = z.infer<typeof EditProfileSchema>;
