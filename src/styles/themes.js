import { createTheme } from "@mui/material"

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
   }
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
   }
})
