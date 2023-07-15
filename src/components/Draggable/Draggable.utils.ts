import { DownRef } from './Draggable.types'

export function move(event: MouseEvent, state: DownRef) {
  const { downStartY, downStartX } = state
  const { pageY, pageX } = event

  return {
    x: Math.round(pageX - downStartX),
    y: Math.round(pageY - downStartY)
  }
}
