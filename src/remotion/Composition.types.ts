import { CompositionData } from '@schemas/composition'
import { Text } from '@schemas/text'

type CompositionPropsPreview = CompositionData & {
  isRendering?: never
  unscale?: number
  handleMoveText?: (
    textId: Text['id'],
    { x, y }: { x: number; y: number }
  ) => void
  handleResizeText?: (
    textId: Text['id'],
    { height, width }: { height: number; width: number }
  ) => void
}

type CompositionPropsProduction = CompositionData & {
  isRendering?: true
  unscale?: never
  handleMoveText?: never
  handleResizeText?: never
}

export type CompositionProps =
  | CompositionPropsPreview
  | CompositionPropsProduction
