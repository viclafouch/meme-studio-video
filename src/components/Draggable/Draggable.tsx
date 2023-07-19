import React from 'react'
import { Text } from '@schemas/text'
import { DraggableState, MagnetiseValue, MetaDown } from './Draggable.types'
import { magnetise, move } from './Draggable.utils'

export type DraggableProps = {
  children: React.ReactElement
  x: number
  y: number
  unscale: number
  textId: Text['id']
  onMagnetiseChange: ({ x, y }: MagnetiseValue) => void
  onMove?: (textId: Text['id'], { x, y }: { x: number; y: number }) => void
}

const onMoveDefault = () => {}

const Draggable = ({
  children,
  x,
  y,
  unscale,
  textId,
  onMagnetiseChange,
  onMove = onMoveDefault
}: DraggableProps) => {
  const elementRef = React.useRef<HTMLElement>(null as never)
  const metaDown = React.useRef<MetaDown>(null as never)
  const [state, setState] = React.useState<DraggableState>({
    mode: false
  })

  const handleDraggingMove = React.useCallback(
    (event: MouseEvent) => {
      const position = move(event, metaDown.current, unscale)
      const positionWithMagnetise = magnetise(position, metaDown.current, 25)

      onMagnetiseChange({
        x: positionWithMagnetise.magnetise[0],
        y: positionWithMagnetise.magnetise[1]
      })
      onMove?.(textId, {
        x: positionWithMagnetise.x,
        y: positionWithMagnetise.y
      })
    },
    [onMove, textId, unscale, onMagnetiseChange]
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    const { pageX, pageY } = event
    event.preventDefault()
    event.stopPropagation()

    const element = elementRef.current
    const container = elementRef.current.parentElement as HTMLElement

    metaDown.current = {
      downStartX: pageX - x / unscale,
      downStartY: pageY - y / unscale,
      width: element.offsetWidth,
      height: element.offsetHeight,
      containerWidth: container.offsetWidth,
      containerHeight: container.offsetHeight
    }

    setState({
      mode: 'dragging'
    })
  }

  const handleMouseUp = React.useCallback(() => {
    setState({
      mode: false
    })
    onMagnetiseChange({
      x: false,
      y: false
    })
  }, [onMagnetiseChange])

  React.useEffect(() => {
    if (state.mode) {
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('mousemove', handleDraggingMove)

      return () => {
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('mousemove', handleDraggingMove)
      }
    }

    return () => {}
  }, [state.mode, handleMouseUp, handleDraggingMove])

  return React.cloneElement(children, {
    onMouseDown: handleMouseDown,
    ref: elementRef
  })
}

export default Draggable
