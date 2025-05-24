import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#f8fff3',  // nền toàn trang
          paper: '#ffffff'     // nền các thẻ như Card, Box...
        },
        primary: {
          main: '#6CBF3C' // xanh lá phù hợp nông nghiệp
        },
        secondary: {
          main: '#F9A825' // vàng đậm, tạo cảm giác sinh trưởng
        }
      }
    },
    // dark: {
    //   palette: {
    //     background: {
    //       default: '#121212',
    //       paper: '#1e1e1e'
    //     },
    //     primary: {
    //       main: '#81c784'
    //     },
    //     secondary: {
    //       main: '#ffb74d'
    //     }
    //   }
    // }
  }
})

export default theme
