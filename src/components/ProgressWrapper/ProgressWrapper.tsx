'use client'

import React from 'react'
import wretch from 'wretch'
import RenderResult from '@components/RenderResult'
import { RenderProgressOrFinality } from '@helpers/get-render-progress-with-finality'
import { Container } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useQuery } from '@tanstack/react-query'

export type ProgressWrapperProps = {
  progress: RenderProgressOrFinality
  id: string
}

const ProgressWrapper = ({
  progress: initialProgress,
  id
}: ProgressWrapperProps) => {
  const { data: progress } = useQuery({
    queryKey: ['progress', id],
    queryFn: () => {
      return wretch(`/studio/progress/${id}`)
        .get()
        .json<RenderProgressOrFinality>()
    },
    refetchInterval(data) {
      return data?.type !== 'finality' ? 1000 : false
    },
    initialData: initialProgress
  })

  if (progress.type === 'finality') {
    return progress.finality.type === 'error' ? (
      <div>Error during render</div>
    ) : (
      <RenderResult finalityResult={progress.finality} />
    )
  }

  return (
    <Container maxWidth="sm">
      <LinearProgress
        variant="determinate"
        value={progress.progress.percent * 100}
      />
    </Container>
  )
}

export default ProgressWrapper
