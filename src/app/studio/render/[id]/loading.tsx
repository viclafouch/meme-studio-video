import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const Loading = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={5}
    >
      <CircularProgress />
      <Typography>Récupération de la vidéo...</Typography>
    </Box>
  )
}

export default Loading
