import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { parseCurrentDate } from "../../utils/dateHelpers"
import NavBar from "../frontend/components/NavBar/NavBar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Calendar from "../frontend/components/Calendar/Calendar"
import TransactionItems from "@/frontend/components/TransactionItems"
import axios from "axios"
import {
   getDailyTransactions,
   getDate,
   findIncomeAndExpenseItems
} from "../../utils/transactionHelpers"

export default function Landing({
   handleSwitch
}) {
   const session = useSession()
   const [userTransactions, setUserTransactions] =
      useState(null)
   const [
      transactionOccurrences,
      setTransactionOccurrences
   ] = useState(null)
   const [isLoading, setLoading] = useState(false)
   const [selectedDay, setSelectedDay] = useState(
      new Date()
   )
   const [expenseItems, setExpenseItems] =
      useState(null)
   const [incomeItems, setIncomeItems] =
      useState(null)
   const router = useRouter()

   useEffect(() => {
      setLoading(true)
      if (session.data) {
         axios
            .get(
               `/api/get_user/${session.data.user.id}`
            )
            .then((data) => data.data)
            .then((userData) => {
               if (
                  userData &&
                  userData.hasOwnProperty(
                     "ledgerAccounts"
                  )
               ) {
                  const transactions =
                     userData.ledgerAccounts.flatMap(
                        (acct) => {
                           return acct.transactions
                        }
                     )
                  setUserTransactions(
                     transactions
                  )
                  const dailyTransactions =
                     transactions.flatMap(
                        (item) => {
                           return item.transactionOccurrences
                        }
                     )
                  if (
                     dailyTransactions.length > 0
                  ) {
                     setTransactionOccurrences(
                        dailyTransactions
                     )
                  } else {
                     setTransactionOccurrences(
                        null
                     )
                  }
               }

               return userTransactions
            })
            .finally(() => {
               setLoading(false)
            })
      }
   }, [session])

   const filterTransactions = (day) => {
      if (!userTransactions || !day) return
      if (userTransactions) {
         const dailyTransactions =
            getDailyTransactions(
               day,
               userTransactions
            )

         setSelectedDay(getDate(day))
         const sortedItems =
            findIncomeAndExpenseItems(
               dailyTransactions
            )
         setExpenseItems(sortedItems[0])
         setIncomeItems(sortedItems[1])
         return dailyTransactions
      }
   }

   const handleDelete = async (itemId) => {
      await fetch(
         `api/transaction/delete/${itemId}`
      )
         .then((data) => console.log(data))
         .then(router.reload())
   }

   if (isLoading) return <p>Loading...</p>

   return (
      <section className="landing">
         <NavBar
            handleSwitch={handleSwitch}
            selectedDay={selectedDay}
         />
         <Container className="landing__main">
            <Calendar
               handleDaySelect={
                  filterTransactions
               }
               items={transactionOccurrences}
               selectedDay={selectedDay}
            />
            <Box>
               <Typography
                  variant="h1"
                  fontSize={35}
                  fontWeight={700}
               >
                  {parseCurrentDate(selectedDay)}
               </Typography>
               {["Expenses", "Income"].map(
                  (item, idx) => {
                     return (
                        <TransactionItems
                           key={idx}
                           category={item}
                           categoryData={
                              idx === 0
                                 ? expenseItems
                                 : incomeItems
                           }
                           transactionData={
                              userTransactions
                           }
                           handleDelete={
                              handleDelete
                           }
                        />
                     )
                  }
               )}
            </Box>
         </Container>
      </section>
   )
}
