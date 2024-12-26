import { z } from "zod";

export const userSchema = z.object({
    fullname: z
        .string()
        .min(3, "must be at least 3 characters long")
        .regex(/^[a-zA-Z\s]+$/, "must only contain letters and spaces")
        .refine((val) => val.split(" ").length >= 2, {
            message: "must contain both first and last name",
        }),
    username: z.string().min(3, "must be at least 3 characters"),
    description: z.string().min(25, "must be at least 25 characters"),
});
