import { Text } from '@schemas/text'

function getMaxLineWidth(lines: string[], context2D: CanvasRenderingContext2D) {
  return lines.map((currentTextLine: string) => {
    return context2D.measureText(currentTextLine).width
  })
}

export function getWrapLines(text: Text, videoWidth: number) {
  const canvas = document.createElement('canvas')
  canvas.width = videoWidth
  const context2D = canvas.getContext('2d') as CanvasRenderingContext2D
  context2D.fillStyle = text.color || 'black'
  context2D.textBaseline = 'top'
  context2D.strokeStyle = 'black'
  context2D.lineJoin = 'round'
  context2D.font = `${text.fontSize}px ${text.fontFamily}`

  const linesSplitted = text.value.split('\n')
  const lines: string[] = []

  for (let index = 0; index < linesSplitted.length; index++) {
    const line = linesSplitted[index]
    let currentSafeLine = ''

    if (!line.length) {
      lines.push(line)
    }

    for (let letterIndex = 0; letterIndex < line.length; letterIndex++) {
      const testLine = currentSafeLine + line[letterIndex]
      const testWidth = context2D.measureText(testLine).width
      const isLastLetter = letterIndex === line.length - 1

      if (text.x + testWidth <= context2D.canvas.width) {
        currentSafeLine = testLine
      } else {
        lines.push(currentSafeLine)
        currentSafeLine = line[letterIndex]
      }

      if (isLastLetter) {
        lines.push(currentSafeLine)
      }
    }
  }

  return {
    lines,
    height: lines.length * text.fontSize,
    width: Math.max(...getMaxLineWidth(lines, context2D)) + 10
  }
}
