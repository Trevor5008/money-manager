import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import NavBar from "../frontend/components/NavBar"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { IconButton } from "@mui/material"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import axios from "axios"

library.add(fas)

export default function Accounts({
   handleSwitch
}) {
   const session = useSession()
   const router = useRouter()
   const [isLoading, setIsLoading] =
      useState(true)
   const [userData, setUserData] = useState(null)
   const [netAccounts, setNetAccounts] =
      useState(null)

   useEffect(() => {
      setIsLoading(true)
      if (session.data) {
         axios
            .get(
               `/api/get_user/${session.data.user.id}`
            )
            .then((data) => {
               setUserData(data.data)
               return data.data
            })
            .then((data) => {
               const accountTotals = calcTotals(
                  data.ledgerAccounts
               )
               setNetAccounts(accountTotals)
               setIsLoading(false)
            })
      }
   }, [session])

   const calcTotals = (acctsData) => {
      const accountTotals = acctsData.reduce(
         (acc, curr) => {
            const balance = Number(
               curr.startingBalance
            )
            return acc + balance
         },
         0
      )
      return accountTotals
   }

   const handleDelete = async (acct) => {
      await fetch(`api/delete_account/${acct.id}`)
         .then((data) => console.log(data))
         .then(() => router.reload())
   }

   if (isLoading) return <h1>Loading...</h1>

   return (
      <>
         <NavBar handleSwitch={handleSwitch} />
         <Container sx={{ mt: 10 }}>
            <Typography variant="h1">
               Accounts:
            </Typography>
            {userData &&
               userData.ledgerAccounts.map(
                  (account, idx) => {
                     const iconName = account.accountType.icon
                     return (
                        <Box
                           key={idx}
                           display="flex"
                           justifyContent="space-between"
                           alignItems="center"
                           padding={3}
                        >
                           <Box className="image-wrapper">
                           <FontAwesomeIcon icon={iconName}/>
                              <Typography variant="h2">
                                 {account.name}
                              </Typography>
                           </Box>
                           <Box
                              position="absolute"
                              right="35%"
                           >
                              <Typography
                                 variant="h5"
                                 fontWeight="bold"
                              >
                                 $
                                 {
                                    account.startingBalance
                                 }
                              </Typography>
                              <Typography variant="h5">
                                 {
                                    account.description
                                 }
                              </Typography>
                           </Box>
                           <Box
                              sx={{
                                 display: "flex",
                                 gap: "10px",
                                 justifyContent:
                                    "center",
                                 alignItems:
                                    "center"
                              }}
                           >
                              <IconButton>
                                 <ModeEditIcon
                                    account={
                                       account
                                    }
                                 />
                              </IconButton>
                              <DeleteIcon
                                 fontSize="large"
                                 onClick={() =>
                                    handleDelete(
                                       account
                                    )
                                 }
                              />
                           </Box>
                        </Box>
                     )
                  }
               )}
            <Box>
               <Typography variant="h2">
                  Net Accounts:
               </Typography>
               <Typography variant="h2">
                  ${netAccounts}
               </Typography>
            </Box>
            <Box>
               <Button
                  variant="contained"
                  onClick={() =>
                     router.push({
                        pathname: "/accounts/add",
                        query: {
                           id: session.data.user
                              .id
                        }
                     })
                  }
                  sx={{
                     fontSize: 12,
                     mb: 1
                  }}
               >
                  Add Account:
               </Button>
               <Button
                  onClick={() => router.push("/")}
               >
                  Back to Home
               </Button>
            </Box>
         </Container>
      </>
   )
}
