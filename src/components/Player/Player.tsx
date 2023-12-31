'use client'

import React from 'react'
import { Composition } from '@remotion/Composition'
import { Player as RemotionPlayer, PlayerRef } from '@remotion/player'
import { Text } from '@schemas/text'
import { useVideoStudio } from '@stores/video-studio'
import { Box } from '@mui/material'

const Player = () => {
  const { texts, updateText, video, isPreviewing, topBlock } = useVideoStudio()
  const playerRef = React.useRef<PlayerRef>(null)
  const [currentUnScale, setCurrentUnScale] = React.useState(1)

  const handleMoveText = React.useCallback(
    (textId: Text['id'], { x, y }: { x: number; y: number }) => {
      updateText(textId, { x, y })
    },
    [updateText]
  )

  const handleResizeText = React.useCallback(
    (
      textId: Text['id'],
      { height, width, scale }: { height: number; width: number; scale: number }
    ) => {
      updateText(textId, { height, width, scale })
    },
    [updateText]
  )

  React.useEffect(() => {
    if (playerRef.current) {
      playerRef.current.addEventListener('scalechange', ({ detail }) => {
        setCurrentUnScale(1 / detail.scale)
      })
    }
  }, [])

  return (
    <Box width="100%" height="100%" overflow="hidden" position="relative">
      {video ? (
        <RemotionPlayer
          durationInFrames={120}
          fps={30}
          ref={playerRef}
          clickToPlay={false}
          style={{ height: '100%', width: '100%' }}
          compositionWidth={video.width}
          compositionHeight={
            topBlock.isVisible ? video.height + topBlock.height : video.height
          }
          component={Composition}
          inputProps={{
            videoURL: video.url,
            texts,
            handleMoveText,
            handleResizeText,
            unscale: currentUnScale,
            isRendering: isPreviewing,
            topBlock
          }}
        />
      ) : null}
    </Box>
  )
}

export default Player
