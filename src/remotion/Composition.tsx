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
  unscale = 1,
  isRendering
}: CompositionProps) => {
  const [magnetise, setMagnetise] = React.useState<MagnetiseValue>(false)

  const handleMagnetiseChange = React.useCallback((value: MagnetiseValue) => {
    setMagnetise(value)
  }, [])

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: '#000000', color: '#fff' }}>
        <RemotionVideo src={videoURL} />
      </AbsoluteFill>
      <AbsoluteFill>
        {magnetise === 'all' || magnetise === 'x' ? (
          <Magnetise axis="x" />
        ) : null}
        {magnetise === 'all' || magnetise === 'y' ? (
          <Magnetise axis="y" />
        ) : null}
        {texts.map((text) => {
          return (
            <Draggable
              onMagnetiseChange={handleMagnetiseChange}
              key={text.id}
              x={text.x}
              y={text.y}
              unscale={unscale}
              textId={text.id}
              onMove={handleMoveText}
            >
              <div
                role="button"
                tabIndex={0}
                style={{
                  transform: `translate3d(${text.x}px, ${text.y}px, 0)`,
                  alignSelf: 'flex-start',
                  fontSize: text.fontSize,
                  cursor: 'move',
                  userSelect: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  fontFamily: text.fontFamily,
                  width: 'fit-content',
                  color: text.color,
                  padding: 20,
                  whiteSpace: 'pre-wrap',
                  border: isRendering ? 'none' : '3px dotted rgb(48, 91, 161)',
                  textAlign: text.textAlign,
                  fontStyle: text.italic ? 'italic' : 'initial',
                  fontWeight: text.bold ? 'bold' : 'initial',
                  textDecoration: text.underlined ? 'underline' : 'initial'
                }}
              >
                {text.value}
              </div>
            </Draggable>
          )
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
