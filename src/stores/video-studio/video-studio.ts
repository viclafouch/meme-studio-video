import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { generateRandomId } from '@helpers/string'
import { createText, Text } from '@schemas/text'

type State = {
  readonly texts: readonly Text[]
  readonly addText: (values?: Partial<Text>) => void
  readonly deleteText: (textId: Text['id']) => void
  readonly updateText: (textId: Text['id'], values: Partial<Text>) => void
  readonly duplicateText: (textId: Text['id'], values?: Partial<Text>) => void
}

export const useVideoStudio = create<State, [['zustand/immer', never]]>(
  immer((produce) => {
    return {
      texts: [],
      addText: (values = {}) => {
        produce((draft) => {
          draft.texts.push({
            ...createText(),
            ...values
          })
        })
      },
      deleteText: (textId) => {
        produce((draft) => {
          draft.texts = draft.texts.filter((text) => {
            return text.id !== textId
          })
        })
      },
      updateText: (textId, values) => {
        produce((draft) => {
          draft.texts = draft.texts.map((text) => {
            if (text.id !== textId) {
              return text
            }

            return {
              ...text,
              ...values
            }
          })
        })
      },
      duplicateText: (textId, values = {}) => {
        produce((draft) => {
          const text = draft.texts.find(({ id }) => {
            return id === textId
          })

          if (text) {
            draft.texts.push({
              ...text,
              id: generateRandomId(),
              ...values
            })
          }
        })
      }
    }
  })
)
