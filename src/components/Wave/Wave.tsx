'use client'

import React from 'react'
import { useTheme } from '@mui/material'

const Wave = () => {
  const theme = useTheme()

  return (
    <svg width="100%" viewBox="0 0 1440 320">
      <path
        fill={theme.palette.primary.main}
        fillOpacity="1"
        d="M0,64L80,85.3C160,107,320,149,480,176C640,203,800,213,960,202.7C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      />
    </svg>
  )
}

export default Wave
