import { matchIsInRange } from '@helpers/number'
import { MagnetiseValue, MetaDown } from './Draggable.types'

export function move(event: MouseEvent, metaDown: MetaDown, unscale: number) {
  const { downStartY, downStartX } = metaDown
  const { pageY, pageX } = event

  return {
    x: Math.round(pageX - downStartX) * unscale,
    y: Math.round(pageY - downStartY) * unscale
  }
}

type MovePosition = ReturnType<typeof move>

function getMagnetiseState({
  isMagnetiseX,
  isMagnetiseY
}: {
  isMagnetiseX: boolean
  isMagnetiseY: boolean
}): MagnetiseValue {
  if (isMagnetiseX && isMagnetiseY) {
    return 'all'
  }

  if (isMagnetiseX) {
    return 'y'
  }

  if (isMagnetiseY) {
    return 'x'
  }

  return false
}

function matchIsMagnetiseX(
  centerX: number,
  containerCenterX: number,
  bounding: number
) {
  return matchIsInRange(
    centerX,
    containerCenterX - bounding,
    containerCenterX + bounding
  )
}

function matchIsMagnetiseY(
  centerY: number,
  containerCenterY: number,
  bounding: number
) {
  return matchIsInRange(
    centerY,
    containerCenterY - bounding,
    containerCenterY + bounding
  )
}

export function magnetise(
  position: MovePosition,
  metaDown: MetaDown,
  bounding = 25
) {
  const { containerCenterX, containerCenterY, width, height } = metaDown
  const halfElementWidth = width / 2
  const halfElementHeight = height / 2

  const isMagnetiseX = matchIsMagnetiseX(
    position.x + halfElementWidth,
    containerCenterX,
    bounding
  )

  const isMagnetiseY = matchIsMagnetiseY(
    position.y + halfElementHeight,
    containerCenterY,
    bounding
  )

  return {
    magnetise: getMagnetiseState({ isMagnetiseX, isMagnetiseY }),
    x: isMagnetiseX ? containerCenterX - halfElementWidth : position.x,
    y: isMagnetiseY ? containerCenterY - halfElementHeight : position.y
  }
}
