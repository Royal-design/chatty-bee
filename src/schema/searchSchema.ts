import { z } from "zod";

export const searchSchema = z.object({
  name: z.string().min(1, "It can't be empty")
});

export type SearchFormData = z.infer<typeof searchSchema>;
