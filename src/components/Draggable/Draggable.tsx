import React from 'react'
import { Text } from '@schemas/text'
import { DownRef, DraggableState } from './Draggable.types'
import { move } from './Draggable.utils'

export type DraggableProps = {
  children: React.ReactElement
  x: number
  y: number
  unscale: number
  textId: Text['id']
  onMove?: (textId: Text['id'], { x, y }: { x: number; y: number }) => void
}

const onMoveDefault = () => {}

const Draggable = ({
  children,
  x,
  y,
  unscale,
  textId,
  onMove = onMoveDefault
}: DraggableProps) => {
  const [state, setState] = React.useState<DraggableState>({
    mode: false
  })
  const downRef = React.useRef<DownRef>(null as never)

  const handleDraggingMove = React.useCallback(
    (event: MouseEvent) => {
      onMove?.(textId, move(event, downRef.current, unscale))
    },
    [onMove, textId, unscale]
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    const { pageX, pageY } = event
    event.preventDefault()
    event.stopPropagation()

    downRef.current = {
      downStartX: pageX - x / unscale,
      downStartY: pageY - y / unscale
    }

    setState({
      mode: 'dragging'
    })
  }

  const handleMouseUp = React.useCallback(() => {
    setState({
      mode: false
    })
  }, [])

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

  return React.cloneElement(children, { onMouseDown: handleMouseDown })
}

export default Draggable
