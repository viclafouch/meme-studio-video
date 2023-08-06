import { z } from 'zod'

export const topBlockSchema = z.object({
  isVisible: z.boolean(),
  height: z.number()
})

export type TopBlock = z.infer<typeof topBlockSchema>
