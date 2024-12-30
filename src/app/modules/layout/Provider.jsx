// @/app/modules/theme/ThemeRegistry.jsx
'use client'

import React from 'react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
// user components
import DrawerProvider from '@/app/modules/contexts/DrawerContext'

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%'
        },
        body: {
          height: '100%',
          backgroundColor: '#fff',
          overflow: 'hidden'
        },
        a: {
          color: 'inherit'
        },
        '*::-webkit-scrollbar': {
          width: '0.3rem',
          height: '0.3rem'
        },
        '*::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.3)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10
        },
        outlined: {
          backgroundColor: '#FDFDFD'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#878787'
          }
        },
        underline: {
          '&:before': {
            borderBottomColor: '#878787'
          }
        }
      }
    }
  }
})

const theme = responsiveFontSizes(baseTheme)

function ThemeRegistry({ children }) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'mui' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted = []
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
    const names = flush()
    if (names.length === 0) {
      return null
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: names.map((name) => cache.inserted[name]).join(' ')
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <DrawerProvider>{children}</DrawerProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default ThemeRegistry
