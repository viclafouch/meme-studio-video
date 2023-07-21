'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Wave from '@components/Wave'
import { getVideoMetadata, VideoMetadata } from '@remotion/media-utils'
import { useVideoStudio } from '@stores/video-studio'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useMutation } from '@tanstack/react-query'

const UploadFile = () => {
  const router = useRouter()
  const { setVideo } = useVideoStudio()

  const temporaryUpload = useMutation({
    mutationFn: (objectUrl: string) => {
      return getVideoMetadata(objectUrl)
    },
    onSuccess: (data: VideoMetadata, objectUrl) => {
      setVideo({
        url: objectUrl,
        width: data.width,
        height: data.height
      })

      console.log(data)

      return router.push(`/studio`)
    }
  })

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (temporaryUpload.isPending) {
      return
    }

    const [file] = Array.from(event.target.files || [])

    const temporaryVideoUrl = window.URL.createObjectURL(file)

    temporaryUpload.mutate(temporaryVideoUrl)
  }

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `url(
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 2V0h1v1H0v1z" fill-opacity=".025"/></svg>'
        )`,
        backgroundSize: '20px 20px'
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: -6,
          zIndex: 2
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ maxInlineSize: '30ch', textWrap: 'balance', mb: 5 }}
        >
          Utilisez une vidéo depuis votre appareil
        </Typography>
        <LoadingButton
          loading={temporaryUpload.isPending}
          size="large"
          variant="contained"
          component="label"
        >
          Importer une vidéo
          <input
            type="file"
            accept="video/mp4, video/webm"
            style={{ width: 0, height: 0 }}
            onChange={handleChangeFile}
          />
        </LoadingButton>
      </Container>
      <Box display="flex" position="absolute" bottom={0} left={0} right={0}>
        <Wave />
      </Box>
    </Box>
  )
}

export default UploadFile
