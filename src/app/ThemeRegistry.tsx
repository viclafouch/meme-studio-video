'use client'
import React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import createCache, { Options } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { orange } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  status: {
    danger: orange[500]
  }
})

export type ThemeRegistryProps = {
  options: Options
  children: React.ReactNode
}

const ThemeRegistry = ({ options, children }: ThemeRegistryProps) => {
  // eslint-disable-next-line react/hook-use-state
  const [state] = React.useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []

    cache.insert = (...args) => {
      const serialized = args[1]

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }

      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []

      return prevInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = state.flush()

    if (names.length === 0) {
      return null
    }

    let styles = ''

    for (const name of names) {
      styles += state.cache.inserted[name]
    }

    return (
      <style
        key={state.cache.key}
        data-emotion={`${state.cache.key} ${names.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />
    )
  })

  return (
    <CacheProvider value={state.cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default ThemeRegistry
