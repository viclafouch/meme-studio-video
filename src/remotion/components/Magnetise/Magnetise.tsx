import React from 'react'
import { blue } from '@mui/material/colors'

export type MagnetiseProps = {
  axis: 'x' | 'y'
}

const Magnetise = ({ axis }: MagnetiseProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: axis === 'y' ? 'calc(50% - 2px)' : 0,
        top: axis === 'x' ? 'calc(50% - 2px)' : 0,
        bottom: 0,
        width: axis === 'y' ? 4 : '100%',
        height: axis === 'x' ? 4 : '100%',
        zIndex: 2,
        backgroundColor: blue[500]
      }}
    >
      Magnetise
    </div>
  )
}

export default Magnetise
