import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {
   Typography,
   Container,
   Box
} from "@mui/material"
import {
   getDailyTransactions,
   getDate,
   findIncomeAndExpenseItems
} from "../../utils/transactionHelpers"
import NavBar from "@/frontend/components/NavBar"
import Calendar from "@/frontend/components/Calendar"
import TransactionItems from "@/frontend/components/TransactionItems"
import { parseCurrentDate } from "../../utils/dateHelpers"
import axios from "axios"

export default function Landing({
   handleSwitch
}) {
   const session = useSession()
   const [isLoading, setLoading] = useState(false)
   const [userTransactions, setUserTransactions] =
      useState(null)
   const [selectedDay, setSelectedDay] = useState(
      new Date()
   )
   const [expenseItems, setExpenseItems] =
      useState(null)
   const [incomeItems, setIncomeItems] =
      useState(null)
   const [
      transactionOccurrences,
      setTransactionOccurrences
   ] = useState(null)
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
                  setTransactionOccurrences(
                     dailyTransactions.length > 0
                        ? dailyTransactions
                        : null
                  )
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
         <Container sx={{ padding: { xs: 0 } }}>
            <Box>
               <Calendar
                  handleDaySelect={
                     filterTransactions
                  }
                  items={transactionOccurrences}
                  selectedDay={selectedDay}
               />
            </Box>
            <Box>
               <Typography
                  variant="h1"
                  fontWeight="bold"
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
