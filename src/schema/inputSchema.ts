import { z } from "zod";

export const inputSchema = z.object({
  text: z.string().min(1, "It can't be empty"),
  photo: z
    .custom<File | null>((file) => file instanceof File || file === null, {
      message: "Please upload a valid photo"
    })
    .optional()
});

export type InputFormData = z.infer<typeof inputSchema>;
