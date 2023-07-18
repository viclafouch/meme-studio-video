import { NextRequest, NextResponse } from 'next/server'
import { getRenderById } from '@database/renders'
import { getRenderProgressWithFinality } from '@helpers/get-render-progress-with-finality'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const render = await getRenderById(params.id)

  if (!render) {
    throw new Error('Could not get progress for ')
  }

  const progress = await getRenderProgressWithFinality({
    render,
    assume0Progress: false
  })

  return NextResponse.json(progress, { status: 200 })
}
