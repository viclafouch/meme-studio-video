export type MagnetiseAxis = 'x' | 'y'

export type MagnetiseSide<T extends MagnetiseAxis> =
  | `start-${T}`
  | `center-${T}`
  | `end-${T}`
  | false

export type MagnetiseSideX = MagnetiseSide<'x'>
export type MagnetiseSideY = MagnetiseSide<'y'>

export type MagnetiseValue = {
  x: MagnetiseSide<'x'>
  y: MagnetiseSide<'y'>
}

export type DraggableState = {
  mode: false | 'dragging'
}

export type MetaDown = {
  downStartX: number
  downStartY: number
  width: number
  height: number
  containerWidth: number
  containerHeight: number
}
