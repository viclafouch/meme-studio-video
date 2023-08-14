import { z } from 'zod'
import { webSafeFonts } from '@constants/web-safe-fonts'
import { generateRandomId } from '@helpers/string'

export const textSchema = z.object({
  value: z.string(),
  id: z.string(),
  color: z.string(),
  italic: z.boolean(),
  fontFamily: z.enum(webSafeFonts),
  bold: z.boolean(),
  underlined: z.boolean(),
  y: z.number(),
  x: z.number(),
  scale: z.number(),
  height: z.number(),
  width: z.number(),
  fontSize: z.number(),
  backgroundColor: z.string(),
  textAlign: z.enum(['left', 'center', 'right', 'justify'])
})

export type Text = z.infer<typeof textSchema>

export function createText(values: Partial<Text> = {}): Text {
  return {
    id: generateRandomId(),
    value: '',
    backgroundColor: 'transparent',
    textAlign: 'left',
    color: '#ffffff',
    fontFamily: 'Arial',
    bold: false,
    x: 0,
    y: 0,
    scale: 1,
    height: 16,
    width: 100,
    fontSize: 50,
    italic: false,
    underlined: false,
    ...values
  }
}
