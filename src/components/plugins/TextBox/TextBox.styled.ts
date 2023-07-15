import { experimentalStyled as styled } from '@mui/material/styles'
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => {
  return {
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius
      }
    }
  }
})
