import * as React from 'react'
import * as R from 'remeda'
import { useVideoStudio } from '@stores/video-studio'
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported'
import RectangleIcon from '@mui/icons-material/Rectangle'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'
import * as Styled from './Tools.styled'

const TooltipProps: Partial<MuiTooltipProps> = {
  placement: 'right'
}

const Tools = () => {
  const addText = useVideoStudio(R.prop('addText'))
  const isPreviewing = useVideoStudio(R.prop('isPreviewing'))
  const isTopBlockVisible = useVideoStudio((state) => {
    return state.topBlock.isVisible
  })
  const toggleIsPreviewing = useVideoStudio(R.prop('toggleIsPreviewing'))
  const toggleTopBlockVisible = useVideoStudio(R.prop('toggleTopBlockVisible'))

  const handleAddText = (event: MuiMouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    addText(true)
  }

  const handleTogglePreview = (event: MuiMouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    toggleIsPreviewing()
  }

  const handleToggleTopBlock = (event: MuiMouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    toggleTopBlockVisible()
  }

  const previewingTitle = `${
    isPreviewing ? 'Désactiver' : 'Activer'
  } les zones de texte`
  const addTextTitle = 'Ajouter une zone de texte'
  const topBlockVisibleTitle = `${
    isTopBlockVisible ? 'Cacher' : 'Afficher'
  } la zone de titre`

  return (
    <Styled.ToolsContainer>
      <List>
        <ListItem disablePadding>
          <Tooltip title={previewingTitle} {...TooltipProps}>
            <Styled.ListItemButton
              aria-label={previewingTitle}
              selected={isPreviewing}
              onClick={handleTogglePreview}
            >
              <ListItemIcon>
                {isPreviewing ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </ListItemIcon>
            </Styled.ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding>
          <Tooltip title={addTextTitle} {...TooltipProps}>
            <Styled.ListItemButton
              aria-label={addTextTitle}
              onClick={handleAddText}
            >
              <ListItemIcon>
                <TextIncreaseIcon />
              </ListItemIcon>
            </Styled.ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding>
          <Tooltip title={topBlockVisibleTitle} {...TooltipProps}>
            <Styled.ListItemButton
              selected={isTopBlockVisible}
              aria-label={topBlockVisibleTitle}
              onClick={handleToggleTopBlock}
            >
              <ListItemIcon>
                {isTopBlockVisible ? (
                  <BrowserNotSupportedIcon />
                ) : (
                  <RectangleIcon />
                )}
              </ListItemIcon>
            </Styled.ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Styled.ToolsContainer>
  )
}

export default Tools
