export const webSafeFonts = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Georgia',
  'Times New Roman',
  'Times',
  'Courier New',
  'Courier',
  'Palatino',
  'Comic Sans MS',
  'Impact'
] as const

export type WebSafeFont = (typeof webSafeFonts)[number]
