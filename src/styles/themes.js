import { createTheme } from "@mui/material"

const typography = {
   h1: {
      fontSize: 30,
      '@media (min-width:600px)': {
         fontSize: 40
      }
   },
   h2: {
      fontSize: 18,
      '@media (min-width:600px)': {
         fontSize: 28
      }
   }
}

export const darkTheme = createTheme({
   palette: {
      mode: "dark",
      primary: {
         main: "#436B81"
      },
      secondary: {
         main: "#9A6955",
         light: "rgb(242, 242, 242)"
      }
   },
   typography
})

export const lightTheme = createTheme({
   palette: {
      mode: "light",
      primary: {
         main: "#436B81"
      },
      secondary: {
         main: "#9A6955",
         light: "rgb(242, 242, 242)"
      }
   },
   typography
})