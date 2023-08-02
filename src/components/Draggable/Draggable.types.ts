export type ResizeSide = 'ne' | 'nw' | 'se' | 'sw'

export type ResizeMode = `resizing-${ResizeSide}`

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
  mode: false | 'dragging' | ResizeMode
}

export type MetaDown = {
  downX: number
  downY: number
  downPageX: MouseEvent['pageX']
  downPageY: MouseEvent['pageY']
  width: number
  height: number
  containerWidth: number
  containerHeight: number
  childrenWidth: number
  childrenHeight: number
}
