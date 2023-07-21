import React from 'react'
import { MagnetiseValue } from '@components/Draggable/Draggable.types'
import { blue } from '@mui/material/colors'

export type MagnetiseProps = {
  value: Exclude<MagnetiseValue['x'] | MagnetiseValue['y'], false>
}

const size = 4 as const
const position = `calc(50% - ${size / 2}px)`

export const stylesByValue = {
  'start-x': {
    top: 0,
    left: 0,
    height: '100%',
    width: size
  },
  'center-x': {
    top: 0,
    left: position,
    height: '100%',
    width: size
  },
  'end-x': {
    top: 0,
    right: 0,
    height: '100%',
    width: size
  },
  'start-y': {
    top: 0,
    left: 0,
    width: '100%',
    height: size
  },
  'center-y': {
    left: 0,
    top: position,
    width: '100%',
    height: size
  },
  'end-y': {
    bottom: 0,
    left: 0,
    width: '100%',
    height: size
  }
} as const satisfies {
  [key in MagnetiseProps['value']]: React.CSSProperties
}

const Magnetise = ({ value }: MagnetiseProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 2,
        backgroundColor: blue[500],
        ...stylesByValue[value]
      }}
    />
  )
}

export default Magnetise
