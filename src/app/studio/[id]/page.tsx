'use client'

import React from 'react'
import Aside from '@components/Aside'
import Player from '@components/Player'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

const StudioDetailsPage = () => {
  return (
    <Grid container spacing={2} height="100%">
      <Grid xs={9}>
        <Box
          p={5}
          display="flex"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Player />
        </Box>
      </Grid>
      <Grid xs={3} component="aside">
        <Aside />
      </Grid>
    </Grid>
  )
}

export default StudioDetailsPage
