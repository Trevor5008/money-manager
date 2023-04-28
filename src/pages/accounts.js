import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import NavBar from "../frontend/components/NavBar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { IconButton } from "@mui/material"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DeleteIcon from "@mui/icons-material/Delete"
import Image from "next/image"
import Button from "@mui/material/Button"
import axios from "axios"

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
               setIsLoading(false)
            })
      }
   }, [session])

   useEffect(() => {
      if (userData) {
         const accountTotals = calcTotals(
            userData.ledgerAccounts
         )
         setNetAccounts(accountTotals)
      }
   })

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
         <section className="accounts">
            <h1 className="accounts__title">
               Accounts:{" "}
            </h1>
            {userData &&
               userData.ledgerAccounts.map(
                  (account, idx) => {
                     const image =
                        account.accountType.icon
                     return (
                        <div
                           key={idx}
                           className="accounts__account"
                        >
                           <div className="accounts__subtitle">
                              <Image
                                 width={100}
                                 height={100}
                                 className="item-icon accounts__icon"
                                 src={`/assets/fontawesome/images/${image}`}
                                 alt={
                                    image.split(
                                       "."
                                    )[0]
                                 }
                              />
                              <h2 className="accounts__account-name">
                                 {account.name}
                              </h2>
                           </div>
                           <div className="accounts__account-details">
                              <Typography
                                 variant="h3"
                                 fontSize="1.4rem"
                                 fontWeight="bold"
                                 sx={{
                                    mr: {
                                       xs: "10vw",
                                       sm: "5vw",
                                       md: 0
                                    }
                                 }}
                              >
                                 $
                                 {
                                    account.startingBalance
                                 }
                              </Typography>
                              <h5>
                                 {
                                    account.description
                                 }
                              </h5>
                           </div>
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
                        </div>
                     )
                  }
               )}
            <div className="accounts__net-container">
               <h2 className="accounts__net-label">
                  Net Accounts:
               </h2>
               <h2 className="accounts__net-label">
                  ${netAccounts}
               </h2>
            </div>
            <div className="accounts__btn-container">
               <Button
                  variant="contained"
                  className="accounts__addBtn"
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
            </div>
         </section>
      </>
   )
}
