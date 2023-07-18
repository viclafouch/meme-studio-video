import { remotionConfig } from '@config/remotion'
import { Finality, Render, updateRenderWithFinality } from '@database/renders'
import { getRenderProgress, RenderProgress } from '@remotion/lambda/client'

export type RenderProgressOrFinality =
  | {
      type: 'progress'
      progress: {
        percent: number
      }
    }
  | {
      type: 'finality'
      finality: Finality
    }

function getFinality(renderProgress: RenderProgress): Finality | null {
  if (renderProgress.outputFile) {
    return {
      type: 'success',
      url: renderProgress.outputFile,
      outputSize: renderProgress.outputSizeInBytes as number
    }
  }

  if (renderProgress.fatalErrorEncountered) {
    return {
      type: 'error',
      errors: renderProgress.errors[0].stack
    }
  }

  return null
}

export const getRenderProgressWithFinality = async ({
  render,
  assume0Progress
}: {
  render: Render
  assume0Progress: boolean
}): Promise<RenderProgressOrFinality> => {
  if (render.finality) {
    return {
      type: 'finality',
      finality: render.finality
    }
  }

  if (!render.renderId) {
    return {
      progress: {
        percent: 0
      },
      type: 'progress'
    }
  }

  const progress = assume0Progress
    ? null
    : await getRenderProgress({
        renderId: render.renderId,
        ...remotionConfig
      })

  const finality = progress === null ? null : getFinality(progress)

  if (finality) {
    await updateRenderWithFinality({
      renderId: render.renderId,
      finality
    })

    return {
      type: 'finality',
      finality
    }
  }

  return {
    type: 'progress',
    progress: {
      percent: progress === null ? 0 : progress.overallProgress
    }
  }
}
