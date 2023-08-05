import * as React from 'react'
import { useVideoStudio } from '@stores/video-studio'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import * as Styled from './Tools.styled'

const Tools = () => {
  const { addText, toggleIsPreviewing } = useVideoStudio()

  const handleAddText = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    addText(true)
  }

  const handleTogglePreview = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    toggleIsPreviewing()
  }

  return (
    <Styled.ToolsContainer>
      <List>
        <ListItem disablePadding>
          <Styled.ListItemButton onClick={handleTogglePreview}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
          </Styled.ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Styled.ListItemButton onClick={handleAddText}>
            <ListItemIcon>
              <TextIncreaseIcon />
            </ListItemIcon>
          </Styled.ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Styled.ToolsContainer>
  )
}

export default Tools
