import * as z from 'zod'

export const userScheme = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(50).includes("*"),
});