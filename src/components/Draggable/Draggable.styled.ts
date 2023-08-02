import { experimentalStyled as styled } from '@mui/material/styles'

const resizeSize = '2.125rem'

export const Resize = styled('div')`
  display: block;
  width: ${resizeSize};
  height: ${resizeSize};
  border-radius: 50%;
  background-color: #305ba1;
  z-index: 2;
  position: absolute;
  transform: translate(-50%, -50%);
  border: 1px solid #ffffff;

  &[data-side='nw'],
  &[data-side='se'] {
    cursor: nwse-resize;
  }
  &[data-side='ne'],
  &[data-side='sw'] {
    cursor: nesw-resize;
  }
  &[data-side^='n'] {
    top: 0;
  }
  &[data-side^='s'] {
    top: 100%;
  }
  &[data-side$='e'] {
    left: 100%;
  }
  &[data-side$='w'] {
    left: 0;
  }
`
