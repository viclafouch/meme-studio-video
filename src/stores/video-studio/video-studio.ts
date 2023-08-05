import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { generateRandomId } from '@helpers/string'
import { createText, Text } from '@schemas/text'
import { Video } from '@schemas/video'

type State = {
  readonly video: Video | null
  readonly setVideo: (video: Video) => void
  readonly texts: Text[]
  readonly isPreviewing: boolean
  readonly toggleIsPreviewing: () => void
  readonly textIdOpened: Text['id'] | null
  readonly addText: (open?: boolean) => void
  readonly deleteText: (textId: Text['id']) => void
  readonly updateText: (textId: Text['id'], values: Partial<Text>) => void
  readonly duplicateText: (textId: Text['id'], values?: Partial<Text>) => void
  readonly updateTextIdOpened: (textId: Text['id'] | null) => void
}

export const useVideoStudio = create<State, [['zustand/immer', never]]>(
  immer((produce) => {
    return {
      isPreviewing: false,
      textIdOpened: null,
      video: {
        url: 'https://file-examples.com/storage/fe072e668b64cd6ce9c9963/2017/04/file_example_MP4_1920_18MG.mp4',
        width: 1920,
        height: 1080
      },
      toggleIsPreviewing: () => {
        produce((draft) => {
          draft.isPreviewing = !draft.isPreviewing
        })
      },
      updateTextIdOpened: (textId) => {
        produce((draft) => {
          draft.textIdOpened = textId
        })
      },
      setVideo: (video) => {
        produce((draft) => {
          draft.video = video
        })
      },
      texts: [],
      addText: (open = false) => {
        produce((draft) => {
          const text = createText()
          draft.texts.push(text)

          if (open) {
            draft.textIdOpened = text.id
          }
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
