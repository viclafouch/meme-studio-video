'use client'

import React from 'react'
import Draggable from '@components/Draggable'
import { Composition } from '@remotion/Composition'
import { Player as RemotionPlayer, PlayerRef } from '@remotion/player'
import { Text } from '@schemas/text'
import { Video } from '@schemas/video'
import { useVideoStudio } from '@stores/video-studio'
import { Box } from '@mui/material'

export type PlayerProps = {
  video: Video
}

const Player = ({ video }: PlayerProps) => {
  const { texts, updateText } = useVideoStudio()
  const playerRef = React.useRef<PlayerRef>(null)
  const [currentScale, setCurrentScale] = React.useState<number>(1)

  const handleMoveText = React.useCallback(
    (textId: Text['id'], { x, y }: { x: number; y: number }) => {
      updateText(textId, { x, y })
    },
    [updateText]
  )

  React.useEffect(() => {
    if (playerRef.current) {
      playerRef.current.addEventListener('scalechange', ({ detail }) => {
        setCurrentScale(detail.scale)
      })
    }
  }, [])

  return (
    <Box
      sx={{ aspectRatio: `${video.width}/${video.height}` }}
      width="100%"
      overflow="hidden"
      position="relative"
    >
      <RemotionPlayer
        durationInFrames={120}
        fps={30}
        showVolumeControls
        controls
        ref={playerRef}
        clickToPlay={false}
        style={{ width: '100%', height: '100%' }}
        compositionWidth={video.width}
        compositionHeight={video.height}
        component={Composition}
        inputProps={{ videoURL: video.url, texts }}
      />
      {texts.map((text) => {
        return (
          <Draggable
            key={text.id}
            x={text.x}
            y={text.y}
            textId={text.id}
            onMove={handleMoveText}
            style={{
              transform: `scale(${currentScale})`
            }}
          >
            <div
              style={{
                fontFamily: 'Arial',
                color: text.color,
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
    </Box>
  )
}

export default Player
