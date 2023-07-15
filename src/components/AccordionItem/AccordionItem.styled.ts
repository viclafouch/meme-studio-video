import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { experimentalStyled as styled } from '@mui/material/styles'

export const AccordionSummary = styled(MuiAccordionSummary)(() => {
  return {
    '.MuiAccordionSummary-content': {
      overflow: 'hidden',
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  }
})
