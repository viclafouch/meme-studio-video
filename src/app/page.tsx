'use client'

import Player from '@components/Player'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

const Home = () => {
  return (
    <Box height="100%">
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid xs={9}>
          <Box
            p={5}
            display="flex"
            sx={{ height: '100%' }}
            justifyContent="center"
            alignItems="center"
          >
            <Player />
          </Box>
        </Grid>
        <Grid xs={3}>
          <div>Hello world</div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
