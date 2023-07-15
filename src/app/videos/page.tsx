import React from 'react'
import VideosList from '@components/VideosList'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const VideosPage = () => {
  return (
    <Container>
      <Box pt={5}>
        <Typography variant="h1">Videos</Typography>
      </Box>
      <VideosList />
    </Container>
  )
}

export default VideosPage
