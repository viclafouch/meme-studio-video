'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import * as Styled from './VideosListItem.styled'

const VideosListItem = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Styled.Item>
      <Box>
        <Styled.Video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          disableRemotePlayback
          onMouseEnter={playVideo}
          onMouseLeave={stopVideo}
          src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>0:12</Typography>
        <Button component={Link} href="/studio/1">
          Custom
        </Button>
      </Box>
    </Styled.Item>
  )
}

export default VideosListItem
