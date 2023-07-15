import React from 'react'
import { Composition as RemotionComposition } from 'remotion'
import { Video } from '@schemas/video'
import { Composition } from './Composition'

const video: Video = {
  url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  width: 1920,
  height: 1080
}

const MyVideo = () => {
  return (
    <RemotionComposition
      component={Composition}
      durationInFrames={120}
      width={1920}
      height={1080}
      fps={30}
      id="my-comp"
      defaultProps={{ texts: [], videoURL: video.url }}
    />
  )
}

export { MyVideo }
