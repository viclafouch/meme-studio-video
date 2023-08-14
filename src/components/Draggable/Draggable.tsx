/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Text } from '@schemas/text'
import * as Styled from './Draggable.styled'
import {
  DraggableState,
  MagnetiseValue,
  MetaDown,
  ResizeMode,
  ResizeSide
} from './Draggable.types'
import { magnetise, move, resize } from './Draggable.utils'

export type DraggableProps = {
  children: React.ReactNode
  x: number
  y: number
  height: number
  width: number
  unscale: number
  disabled?: boolean
  textId: Text['id']
  onMagnetiseChange: ({ x, y }: MagnetiseValue) => void
  onMove?: (textId: Text['id'], { x, y }: { x: number; y: number }) => void
  onResize?: (
    textId: Text['id'],
    { height, width, scale }: { height: number; width: number; scale: number }
  ) => void
  style: React.CSSProperties
}

const defaultFunction = () => {}

const Draggable = ({
  children,
  x,
  y,
  height,
  width,
  unscale,
  textId,
  onMagnetiseChange,
  disabled = false,
  onMove = defaultFunction,
  onResize = defaultFunction,
  style
}: DraggableProps) => {
  const elementRef = React.useRef<HTMLDivElement>(null as never)
  const metaDown = React.useRef<MetaDown>(null as never)
  const [state, setState] = React.useState<DraggableState>({
    mode: false
  })

  const getMetaOnDown = (event: React.MouseEvent): MetaDown => {
    const { pageX, pageY } = event
    const element = elementRef.current
    const container = elementRef.current.parentElement as HTMLElement

    return {
      downX: x / unscale,
      downY: y / unscale,
      downPageY: pageY,
      downPageX: pageX,
      width: element.offsetWidth / unscale,
      height: element.offsetHeight / unscale,
      containerWidth: container.offsetWidth / unscale,
      containerHeight: container.offsetHeight / unscale
    }
  }

  const handleDraggingMove = React.useCallback(
    (event: MouseEvent) => {
      const position = move(event, metaDown.current)
      const positionWithMagnetise = magnetise(position, metaDown.current, 10)

      onMagnetiseChange({
        x: positionWithMagnetise.magnetise[0],
        y: positionWithMagnetise.magnetise[1]
      })
      onMove?.(textId, {
        x: positionWithMagnetise.x * unscale,
        y: positionWithMagnetise.y * unscale
      })
    },
    [onMove, textId, unscale, onMagnetiseChange]
  )

  const handleResizeMove = React.useCallback(
    (event: MouseEvent) => {
      const resizer = resize(event, state.mode as ResizeMode, metaDown.current)

      onResize?.(textId, {
        height: resizer.height * unscale,
        width: resizer.width * unscale,
        scale: 1
      })
    },
    [onResize, state.mode, unscale, textId]
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    metaDown.current = getMetaOnDown(event)

    setState({
      mode: 'dragging'
    })
  }

  const handleMouseDownOnResize = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const side = event.currentTarget.getAttribute('data-side') as ResizeSide
    metaDown.current = getMetaOnDown(event)

    setState({
      mode: `resizing-${side}`
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

      if (state.mode === 'dragging') {
        window.addEventListener('mousemove', handleDraggingMove)
      } else if (state.mode.includes('resizing')) {
        window.addEventListener('mousemove', handleResizeMove)
      }

      return () => {
        if (state.mode === 'dragging') {
          window.removeEventListener('mousemove', handleDraggingMove)
        } else if (state.mode && state.mode.includes('resizing')) {
          window.removeEventListener('mousemove', handleResizeMove)
        }
      }
    }

    return () => {}
  }, [state.mode, handleMouseUp, handleDraggingMove, handleResizeMove])

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <>
      <div
        style={{
          position: 'absolute',
          height,
          width,
          zIndex: 2,
          transform: `translate3d(${x}px, ${y}px, 0)`,
          overflowWrap: 'break-word',
          willChange: 'height, width, transform'
        }}
        onMouseDown={handleMouseDown}
        ref={elementRef}
      >
        {!disabled ? (
          <>
            <Styled.Resize data-side="ne" />
            <Styled.Resize data-side="nw" />
            <Styled.Resize
              data-side="se"
              onMouseDown={handleMouseDownOnResize}
            />
            <Styled.Resize
              data-side="sw"
              onMouseDown={handleMouseDownOnResize}
            />
          </>
        ) : null}
        <div style={style}>{children}</div>
      </div>
      <div
        style={{
          position: 'absolute',
          height,
          width,
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'rgb(48, 91, 161)',
          transform: `translate3d(${x}px, ${y}px, 0)`,
          willChange: 'height, width, transform'
        }}
      >
        <Styled.Resize data-side="ne" />
        <Styled.Resize data-side="nw" />
        <Styled.Resize data-side="se" onMouseDown={handleMouseDownOnResize} />
        <Styled.Resize data-side="sw" onMouseDown={handleMouseDownOnResize} />
      </div>
    </>
  )
}

export default Draggable
