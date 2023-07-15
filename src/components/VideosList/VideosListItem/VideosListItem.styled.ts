import Paper from '@mui/material/Paper'
import { experimentalStyled as styled } from '@mui/material/styles'

export const Item = styled(Paper)(({ theme }) => {
  return {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'hidden'
  }
})

export const Video = styled('video')`
  object-fit: cover;
  width: 100%;
`
