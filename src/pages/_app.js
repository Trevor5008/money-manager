import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Head from "next/head";
import NavBar from "../frontend/components/NavBar/NavBar";
import "@/styles/globals.scss";
import "@/styles/home.scss";
import "../frontend/components/NavBar/NavBar.scss";
import "../frontend/components/ThemeSwitch/ThemeSwitch.scss";
import CreditCard from "../assets/fontawesome/images/credit-card.svg";
import Image from "next/image";

export default function App({
   Component,
   pageProps: { session, ...pageProps },
}) {
   const [render, setRender] = useState(false);
   const [colorTheme, setColorTheme] = useState("light");
   const [userId, setUserId] = useState(1);

   const theme = createTheme({
      palette: {
         mode: colorTheme,
      },
      typography: {},
   });

   useEffect(() => setRender(true), []);

   if (typeof window === "undefined") return null;

   const handleSwitch = () => {
      const newColorTheme = colorTheme === "light" ? "dark" : "light";
      setColorTheme(newColorTheme);
   };

   return render ? (
      <>
         <Head>
            <title>Money Manager</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/money-mgr-favicon.ico" />
         </Head>
         <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
               <CssBaseline />
               <NavBar userId={userId} handleSwitch={handleSwitch} />
               <Image
                  className="icon"
                  src={CreditCard}
                  alt="credit card icon"
               />
               <Component {...pageProps} />
            </SessionProvider>
         </ThemeProvider>
      </>
   ) : null;
}
