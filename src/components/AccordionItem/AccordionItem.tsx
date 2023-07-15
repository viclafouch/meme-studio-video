import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import * as Styled from './AccordionItem.styled'

export type AccordionItemProps = {
  children: React.ReactNode
  title: string
  isExpanded: boolean
  onChange: (isExpanded: boolean) => void
  onDelete: () => void
  onDuplicate: () => void
  index: number
}

export const AccordionItem = ({
  children,
  title,
  onChange,
  onDuplicate,
  onDelete,
  isExpanded,
  index
}: AccordionItemProps) => {
  const handleChange = (
    event: React.SyntheticEvent,
    isNewExpanded: boolean
  ) => {
    onChange(isNewExpanded)
  }

  const handleDuplicate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    onDuplicate()
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    onDelete()
  }

  return (
    <Accordion
      disableGutters
      square
      expanded={isExpanded}
      onChange={handleChange}
    >
      <Styled.AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box flexGrow={1} maxWidth="100%" overflow="hidden">
          <Typography noWrap>{title || `Text #${index + 1}`}</Typography>
        </Box>
        <Box flexShrink={0} overflow="hidden">
          <IconButton
            size="small"
            onClick={handleDuplicate}
            aria-label="Dupliquer"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleDelete}
            aria-label="Supprimer"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Styled.AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem
