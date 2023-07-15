import { z } from 'zod'

export const videoSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number()
})

export type Video = z.infer<typeof videoSchema>
