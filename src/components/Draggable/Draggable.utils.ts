/* eslint-disable id-length */
import { matchIsInRange } from '@helpers/number'
import { MagnetiseSideX, MagnetiseSideY, MetaDown } from './Draggable.types'

export function move(event: MouseEvent, metaDown: MetaDown, unscale: number) {
  const { downStartY, downStartX } = metaDown
  const { pageY, pageX } = event

  return {
    x: Math.round(pageX - downStartX) * unscale,
    y: Math.round(pageY - downStartY) * unscale
  }
}

type MovePosition = ReturnType<typeof move>

type MagnetiseParams = {
  bounding: number
  maxSize: number
  size: number
}

type MagnetiseX = {
  magnetiseValue: MagnetiseSideX
  x: number
}

type MagnetiseY = {
  magnetiseValue: MagnetiseSideY
  y: number
}

function getMagnetiseX(
  x: number,
  { bounding, maxSize, size }: MagnetiseParams
): MagnetiseX {
  if (matchIsInRange(x, -bounding, bounding)) {
    return {
      magnetiseValue: 'start-x',
      x: 0
    }
  }

  if (
    matchIsInRange(x + size / 2, maxSize / 2 - bounding, maxSize / 2 + bounding)
  ) {
    return {
      magnetiseValue: 'center-x',
      x: maxSize / 2 - size / 2
    }
  }

  if (matchIsInRange(x + size, maxSize - bounding, maxSize + bounding)) {
    return {
      magnetiseValue: 'end-x',
      x: maxSize - size
    }
  }

  return {
    magnetiseValue: false,
    x
  }
}

function getMagnetiseY(
  y: number,
  { bounding, maxSize, size }: MagnetiseParams
): MagnetiseY {
  if (matchIsInRange(y, -bounding, bounding)) {
    return {
      magnetiseValue: 'start-y',
      y: 0
    }
  }

  if (
    matchIsInRange(y + size / 2, maxSize / 2 - bounding, maxSize / 2 + bounding)
  ) {
    return {
      magnetiseValue: 'center-y',
      y: maxSize / 2 - size / 2
    }
  }

  if (matchIsInRange(y + size, maxSize - bounding, maxSize + bounding)) {
    return {
      magnetiseValue: 'end-y',
      y: maxSize - size
    }
  }

  return {
    magnetiseValue: false,
    y
  }
}

export function magnetise(
  position: MovePosition,
  metaDown: MetaDown,
  bounding = 25
): {
  magnetise: [MagnetiseSideX, MagnetiseSideY]
  x: number
  y: number
} {
  const { containerWidth, containerHeight, width, height } = metaDown

  const magnetiseX = getMagnetiseX(position.x, {
    bounding,
    maxSize: containerWidth,
    size: width
  })

  const magnetiseY = getMagnetiseY(position.y, {
    bounding,
    maxSize: containerHeight,
    size: height
  })

  return {
    magnetise: [magnetiseX.magnetiseValue, magnetiseY.magnetiseValue],
    x: magnetiseX.x,
    y: magnetiseY.y
  }
}
