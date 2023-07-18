import { z } from 'zod'
import { generateRandomId } from '@helpers/string'

export const textSchema = z.object({
  value: z.string(),
  id: z.string(),
  color: z.string(),
  italic: z.boolean(),
  bold: z.boolean(),
  underlined: z.boolean(),
  y: z.number(),
  x: z.number(),
  fontSize: z.number(),
  textAlign: z.enum(['left', 'center', 'right', 'justify'])
})

export type Text = z.infer<typeof textSchema>

export function createText(values: Partial<Text> = {}): Text {
  return {
    id: generateRandomId(),
    value: '',
    textAlign: 'left',
    color: '#000000',
    bold: false,
    x: 0,
    y: 0,
    fontSize: 30,
    italic: false,
    underlined: false,
    ...values
  }
}
