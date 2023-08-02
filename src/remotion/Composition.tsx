import React from 'react'
import { AbsoluteFill, Video as RemotionVideo } from 'remotion'
import Draggable from '@components/Draggable'
import { MagnetiseValue } from '@components/Draggable/Draggable.types'
import { CompositionProps } from '@remotion/Composition.types'
import Magnetise from './components/Magnetise'

export const Composition = ({
  videoURL,
  texts,
  handleMoveText,
  handleResizeText,
  unscale = 1,
  isRendering
}: CompositionProps) => {
  const [magnetise, setMagnetise] = React.useState<MagnetiseValue>({
    x: false,
    y: false
  })

  const handleMagnetiseChange = React.useCallback((value: MagnetiseValue) => {
    setMagnetise(value)
  }, [])

  return (
    <AbsoluteFill>
      <RemotionVideo src={videoURL} />
      <AbsoluteFill>
        {magnetise.x ? <Magnetise value={magnetise.x} /> : null}
        {magnetise.y ? <Magnetise value={magnetise.y} /> : null}
        {texts.map((text) => {
          return (
            <Draggable
              onMagnetiseChange={handleMagnetiseChange}
              key={text.id}
              x={text.x}
              y={text.y}
              height={text.height}
              width={text.width}
              unscale={unscale}
              disabled={isRendering}
              textId={text.id}
              onMove={handleMoveText}
              onResize={handleResizeText}
              style={{
                alignSelf: 'flex-start',
                fontSize: text.fontSize,
                cursor: 'move',
                userSelect: 'none',
                fontFamily: text.fontFamily,
                color: text.color,
                lineHeight: '100%',
                whiteSpace: 'pre-wrap',
                backgroundColor: text.backgroundColor,
                textAlign: text.textAlign,
                fontStyle: text.italic ? 'italic' : 'initial',
                fontWeight: text.bold ? 'bold' : 'initial',
                textDecoration: text.underlined ? 'underline' : 'initial'
              }}
            >
              <div role="button" tabIndex={0} style={{ display: 'inline' }}>
                {text.value}
              </div>
            </Draggable>
          )
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
