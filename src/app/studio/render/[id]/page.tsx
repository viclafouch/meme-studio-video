import React from 'react'
import { notFound } from 'next/navigation'
import ProgressWrapper from '@components/ProgressWrapper'
import { getRenderById } from '@database/renders'
import { getRenderProgressWithFinality } from '@helpers/get-render-progress-with-finality'
import Box from '@mui/material/Box'

export type RenderDetailsProps = {
  params: {
    id: string
  }
}

const RenderDetails = async ({ params }: RenderDetailsProps) => {
  const { id } = params

  const render = await getRenderById(id)

  if (!render) {
    return notFound()
  }

  const progress = await getRenderProgressWithFinality({
    render,
    assume0Progress: false
  })

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <ProgressWrapper progress={progress} id={id} />
    </Box>
  )
}

export default RenderDetails
