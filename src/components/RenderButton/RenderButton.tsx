'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import wretch from 'wretch'
import { CompositionData } from '@schemas/composition'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'

export type RenderButtonProps = CompositionData

const RenderButton = ({ videoURL, texts }: RenderButtonProps) => {
  const router = useRouter()

  const render = useMutation({
    mutationFn: (compositionProps: CompositionData) => {
      return wretch('/studio/render')
        .post(compositionProps)
        .json<{ id: string }>()
    },
    onSuccess: (data) => {
      router.push(`/studio/render/${data.id}`)
    }
  })

  const handleExport = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    render.mutate({
      videoURL,
      texts
    })
  }

  return (
    <LoadingButton
      loading={render.isPending}
      color="inherit"
      onClick={handleExport}
    >
      Exporter
    </LoadingButton>
  )
}

export default RenderButton
