'use client'

import React from 'react'
import Aside from '@components/Aside'
import Player from '@components/Player'
import Tools from '@components/Tools'
import Box from '@mui/material/Box'

const StudioDetailsPage = () => {
  return (
    <Box display="grid" height="100%" gridTemplateColumns="54px auto 320px">
      <Tools />
      <Box
        p={5}
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Player />
      </Box>
      <Aside />
    </Box>
  )
}

export default StudioDetailsPage
