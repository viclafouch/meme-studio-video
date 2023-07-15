import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import VideosListItem from './VideosListItem'

const VideosList = () => {
  return (
    <Box py={5}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(10)).map((_, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Grid xs={2} sm={4} md={4} key={index}>
              <VideosListItem />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default VideosList
