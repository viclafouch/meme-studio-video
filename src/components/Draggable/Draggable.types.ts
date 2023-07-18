export type MagnetiseValue = false | 'x' | 'y' | 'all'

export type DraggableState = {
  mode: false | 'dragging'
}

export type MetaDown = {
  downStartX: number
  downStartY: number
  width: number
  height: number
  containerCenterX: number
  containerCenterY: number
}
