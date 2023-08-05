import { CompositionData } from '@schemas/composition'
import { Text } from '@schemas/text'

export type CompositionProps = CompositionData & {
  isRendering?: boolean
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
