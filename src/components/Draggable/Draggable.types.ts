export type DraggableSide = 'ne' | 'nw' | 'se' | 'sw'

export type DraggableState = {
  mode: false | 'dragging'
}

export type DownRef = {
  downStartX: number
  downStartY: number
}
