import { createTheme, responsiveFontSizes } from '@mui/material/styles'

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

export const theme = responsiveFontSizes(baseTheme)
