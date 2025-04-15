import { z } from 'zod'

import { PostSchema } from '@/schemas/posts'
export type Post = z.infer<typeof PostSchema>
export type Posts = Post[]