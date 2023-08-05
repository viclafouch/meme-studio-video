'use client'

import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import RenderButton from '@components/RenderButton'
import { useVideoStudio } from '@stores/video-studio'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Navbar = () => {
  const { texts, video } = useVideoStudio()
  const [, renderOrId] = useSelectedLayoutSegments()

  const isExportButtonVisible = renderOrId !== 'render' || !renderOrId

  return (
    <AppBar position="static" sx={{ zIndex: 2 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Meme Studio Video
        </Typography>
        {video && isExportButtonVisible ? (
          <RenderButton videoURL={video.url} texts={texts} />
        ) : (
          <Button color="inherit" href="/studio" LinkComponent={Link}>
            Créer une nouvelle vidéo
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
