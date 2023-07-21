'use client'

import React from 'react'
import Aside from '@components/Aside'
import Player from '@components/Player'
import Box from '@mui/material/Box'

const StudioDetailsPage = () => {
  return (
    <Box display="grid" height="100%" gridTemplateColumns="repeat(12, 1fr)">
      <Box
        p={5}
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        gridColumn="span 8"
        overflow="hidden"
      >
        <Player />
      </Box>
      <Box gridColumn="span 4" component="aside">
        <Aside />
      </Box>
    </Box>
  )
}

export default StudioDetailsPage
