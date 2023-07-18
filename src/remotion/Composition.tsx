import React from 'react'
import { AbsoluteFill, Video as RemotionVideo } from 'remotion'
import Draggable from '@components/Draggable'
import { CompositionProps } from '@remotion/Composition.types'

export const Composition = ({
  videoURL,
  texts,
  handleMoveText,
  unscale = 1,
  isRendering
}: CompositionProps) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: '#000000', color: '#fff' }}>
        <RemotionVideo src={videoURL} />
      </AbsoluteFill>
      <AbsoluteFill>
        {texts.map((text) => {
          return (
            <Draggable
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
                  fontFamily: 'Arial',
                  alignSelf: 'flex-start',
                  fontSize: text.fontSize,
                  cursor: 'move',
                  userSelect: 'none',
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
