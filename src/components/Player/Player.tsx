'use client'

import React from 'react'
import { MyComp } from '@remotion/Composition'
import { Player as RemotionPlayer } from '@remotion/player'

const Player = () => {
  return (
    <RemotionPlayer
      durationInFrames={120}
      fps={30}
      style={{ width: '100%' }}
      compositionWidth={1920}
      compositionHeight={1080}
      component={MyComp}
      inputProps={{ text: 'Hello world' }}
    />
  )
}

export default Player
