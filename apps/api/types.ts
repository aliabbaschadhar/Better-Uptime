import { z } from "zod"

export const authInput = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export const websiteInput = z.object({
  url: z.string().url("Invalid URL format"),
  timeAdded: z.date().optional(),
  userId: z.string().optional()
})