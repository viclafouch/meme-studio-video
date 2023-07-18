import { NextRequest, NextResponse } from 'next/server'
import { remotionConfig } from '@config/remotion'
import { insertRender } from '@database/renders'
import { getRenderProgressWithFinality } from '@helpers/get-render-progress-with-finality'
import { CompositionProps } from '@remotion/Composition.types'
import { renderMediaOnLambda } from '@remotion/lambda/client'
import { compositionDataSchema } from '@schemas/composition'

export async function POST(request: NextRequest) {
  const jsonData = await request.json()

  const jsonParsed = compositionDataSchema.safeParse(jsonData)

  if (!jsonParsed.success) {
    return NextResponse.json(
      {
        message: jsonParsed.error.issues
      },
      { status: 400 }
    )
  }

  const { renderId } = await renderMediaOnLambda({
    composition: 'my-comp',
    ...remotionConfig,
    downloadBehavior: {
      type: 'download',
      fileName: `meme-studio-video.mp4`
    },
    inputProps: {
      isRendering: true,
      videoURL: jsonParsed.data.videoURL,
      texts: jsonParsed.data.texts
    } as CompositionProps
  })

  console.log(`RenderId ${renderId} is rendering`)

  const { insertedId } = await insertRender({ renderId })
  const id = insertedId.toHexString()

  console.log(`RenderId ${renderId} has been inserted in DB with id ${id}`)

  const progress = await getRenderProgressWithFinality({
    render: {
      renderId,
      finality: null
    },
    assume0Progress: true
  })

  console.log(progress)

  return NextResponse.json(
    {
      ...progress,
      renderId,
      id
    },
    { status: 200 }
  )
}
