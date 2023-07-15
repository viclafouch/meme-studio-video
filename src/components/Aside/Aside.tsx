import React from 'react'
import TextBox from '@components/plugins/TextBox'
import { Text } from '@schemas/text'
import { useVideoStudio } from '@stores/video-studio'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Aside = () => {
  const { texts, addText, updateText, duplicateText, deleteText } =
    useVideoStudio()

  const handleAddText = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    addText()
  }

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

  return (
    <Box
      pt={3}
      sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}
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
          />
        )
      })}
      <Button
        onClick={handleAddText}
        variant="contained"
        fullWidth
        size="large"
        sx={{ borderRadius: 0 }}
      >
        Ajouter un texte
      </Button>
    </Box>
  )
}

export default Aside
