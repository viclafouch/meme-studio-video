import MuiListItemButton from '@mui/material/ListItemButton'
import { experimentalStyled as styled } from '@mui/material/styles'

export const ToolsContainer = styled('div')(({ theme }) => {
  return {
    borderRight: `1px solid ${theme.palette.divider}`
  }
})

export const ListItemButton = styled(MuiListItemButton)`
  justify-content: center;
  display: flex;

  .MuiListItemIcon-root {
    justify-content: center;
  }
`
