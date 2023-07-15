import React from 'react'
import { Text } from '@schemas/text'
import Box from '@mui/material/Box'
import { DownRef, DraggableState } from './Draggable.types'
import { move } from './Draggable.utils'

export type DraggableProps = {
  children: React.ReactNode
  x: number
  y: number
  textId: Text['id']
  onMove: (textId: Text['id'], { x, y }: { x: number; y: number }) => void
  style?: React.CSSProperties
}

const Draggable = ({
  children,
  x,
  y,
  textId,
  onMove,
  style = undefined
}: DraggableProps) => {
  const [state, setState] = React.useState<DraggableState>({
    mode: false
  })
  const downRef = React.useRef<DownRef>(null as never)

  const handleDraggingMove = React.useCallback(
    (event: MouseEvent) => {
      onMove(textId, move(event, downRef.current))
    },
    [onMove, textId]
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    const { pageX, pageY } = event
    event.preventDefault()
    event.stopPropagation()

    downRef.current = {
      downStartX: pageX - x,
      downStartY: pageY - y,
      downPageX: pageX,
      downPageY: pageY
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

  return (
    <Box
      position="absolute"
      style={{
        top: y,
        left: x,
        backgroundColor: 'red',
        ...style
        // transform: `translate3d(${x}px, ${y}px, 0)`
      }}
      sx={{
        cursor: 'move',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </Box>
  )
}

export default Draggable
