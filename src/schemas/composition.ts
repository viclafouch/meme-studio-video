import { z } from 'zod'
import { textSchema } from '@schemas/text'

export const compositionDataSchema = z.object({
  videoURL: z.string(),
  texts: z.array(textSchema).default([])
})

export type CompositionData = z.infer<typeof compositionDataSchema>
