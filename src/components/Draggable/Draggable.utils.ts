import { DownRef } from './Draggable.types'

export function move(event: MouseEvent, state: DownRef, unscale: number) {
  const { downStartY, downStartX } = state
  const { pageY, pageX } = event

  return {
    x: Math.round(pageX - downStartX) * unscale,
    y: Math.round(pageY - downStartY) * unscale
  }
}
