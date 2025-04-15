import { z } from 'zod'


export const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    createdAt: z.string()
})
