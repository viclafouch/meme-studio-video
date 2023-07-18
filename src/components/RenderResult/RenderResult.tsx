import React from 'react'
import prettyBytes from 'pretty-bytes'
import { FinalitySucceed } from '@database/renders'
import DownloadIcon from '@mui/icons-material/Download'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export type RenderResultProps = {
  finalityResult: FinalitySucceed
}

const RenderResult = ({ finalityResult }: RenderResultProps) => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" mb={2} component="h1" align="center">
          Votre vidéo est prête 🥳
        </Typography>
        <video
          disablePictureInPicture
          width="100%"
          height="100%"
          src={finalityResult.url}
          controls
        />
        <Box
          mt={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>{prettyBytes(finalityResult.outputSize)}</Typography>
          <Button
            variant="contained"
            href={finalityResult.url}
            download
            endIcon={<DownloadIcon />}
          >
            Télécharger
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default RenderResult
