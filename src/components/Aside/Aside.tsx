import React from 'react'
import TextBox from '@components/plugins/TextBox'
import { Text } from '@schemas/text'
import { useVideoStudio } from '@stores/video-studio'
import Box from '@mui/material/Box'

const Aside = () => {
  const {
    texts,
    updateText,
    textIdOpened,
    duplicateText,
    deleteText,
    updateTextIdOpened
  } = useVideoStudio()

  const handleChangeText = React.useCallback(
    (text: Text) => {
      updateText(text.id, text)
    },
    [updateText]
  )

  const handleDuplicateText = React.useCallback(
    (text: Text) => {
      duplicateText(text.id)
    },
    [duplicateText]
  )

  const handleDeleteText = React.useCallback(
    (text: Text) => {
      deleteText(text.id)
    },
    [deleteText]
  )

  const handleExpandedChange = React.useCallback(
    (textId: Text['id'], isOpened: boolean) => {
      updateTextIdOpened(isOpened ? textId : null)
    },
    [updateTextIdOpened]
  )

  return (
    <Box
      pt={3}
      sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)', overflowY: 'auto' }}
      height="100%"
    >
      {texts.map((text, index) => {
        return (
          <TextBox
            onDelete={handleDeleteText}
            onDuplicate={handleDuplicateText}
            onChange={handleChangeText}
            text={text}
            index={index}
            key={text.id}
            onExpandedChange={handleExpandedChange}
            isExpanded={text.id === textIdOpened}
          />
        )
      })}
    </Box>
  )
}

export default Aside
