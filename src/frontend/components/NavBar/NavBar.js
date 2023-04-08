import { useState, useEffect } from "react";
import { router } from "next/router";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const pagesObj = {
   home: "Home",
   accounts: "Accounts",
   our_team: "Our Team",
   contact_us: "Contact Us",
   support: "Support",
};

const settings = ["profile", "settings", "logout"];

export default function NavBar({ handleSwitch, selectedDay }) {
   const session = useSession();
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [userData, setUserData] = useState(null);

   useEffect(() => {
      if (session.data) {
         axios.get(`/api/get_user/${session.data.user.id}`).then((data) => {
            setUserData(data.data);
         });
      }
   }, [session]);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = (evt) => {
      const attributes = evt.target.attributes;
      if (attributes.name) {
         const option = attributes.name.value;
         if (option === "logout") {
            signOut({
               callbackUrl: "http://localhost:3000",
            });
         } else {
            router.push(`/${option}`);
         }
      }
      setAnchorElUser(null);
   };

   const handleAdd = () => {
      router.push({
         pathname: '/transaction/add',
         query: { id: userData.id}
      })
   }

   return (
      <AppBar className="main-nav" position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  Money Manager
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <MenuIcon
                     onClick={handleOpenNavMenu}
                     className="main-nav__menu-icon"
                  />
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}
                  >
                     {Object.keys(pagesObj).map((page) => {
                        const path = page !== "home" 
                           ? `/${page}` : "/";
                        return (
                           <MenuItem key={page} onClick={handleCloseNavMenu}>
                              <Link href={path}>{pagesObj[page]}</Link>
                           </MenuItem>
                        );
                     })}
                  </Menu>
               </Box>
               <ThemeSwitch
                  className="main-nav__theme-switch"
                  handleSwitch={handleSwitch}
               />
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {Object.keys(pagesObj).map((page) => {
                     const path = page !== "home" ? `/${page}` : "/";
                     return (
                        <Button
                           key={page}
                           onClick={handleCloseNavMenu}
                           sx={{ my: 2, color: "white", display: "block" }}
                        >
                           <Link href={path}>{pagesObj[page]}</Link>
                        </Button>
                     );
                  })}
               </Box>
               <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab 
                     aria-label="add"
                     onClick={handleAdd}
                  >
                     <AddIcon />
                  </Fab>
               </Box>
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                           alt="Remy Sharp"
                           src={userData ? userData.image : "#"}
                        />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: "45px" }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting}>
                           <Typography
                              textAlign="center"
                              onClick={(evt) =>
                                 handleCloseUserMenu(evt, setting)
                              }
                              name={setting}
                           >
                              {setting}
                           </Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
}
