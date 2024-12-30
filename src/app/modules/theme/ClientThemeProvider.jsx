'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: () => document.body
      }
    },
    MuiPopper: {
      defaultProps: {
        container: () => document.body
      }
    },
    MuiModal: {
      defaultProps: {
        container: () => document.body
      }
    }
  }
})

export default function ClientThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
