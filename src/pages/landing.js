import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import NavBar from "../frontend/components/NavBar/NavBar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Calendar from "../frontend/components/Calendar/Calendar"
import CachedIcon from "@mui/icons-material/Cached"
import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import UpcomingIcon from "@mui/icons-material/Upcoming"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import axios from "axios"

export default function Landing({
   handleSwitch
}) {
   const session = useSession()
   const [userData, setUserData] = useState(null)
   const [userAccounts, setUserAccounts] =
      useState(null)
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
   const [daysTransactions, setDaysTransactions] =
      useState(null)
   const [expenseItems, setExpenseItems] =
      useState(null)
   const [incomeItems, setIncomeItems] =
      useState(null)
   const router = useRouter();

   useEffect(() => {
      setLoading(true)
      if (session.data) {
         axios
            .get(
               `/api/get_user/${session.data.user.id}`
            )
            .then((data) => {
               setUserData(data.data)
               if (
                  userData &&
                  userData.hasOwnProperty(
                     "ledgerAccounts"
                  )
               ) {
                  setUserAccounts(
                     userData.ledgerAccounts
                  )
               }
               return data.data
            })
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
               const daysTransactions =
                  filterTransactions(selectedDay)
               setDaysTransactions(
                  daysTransactions
               )
               return userTransactions
            })
            .finally(() => {
               setLoading(false)
            })
      }
   }, [session])

   const filterTransactions = (day) => {
      if (!userTransactions || !day) return
      const date = day.hasOwnProperty("$d")
         ? day.$d
         : day
      if (userTransactions) {
         const dailyTransactions =
            userTransactions.flatMap((item) => {
               return item.transactionOccurrences.filter(
                  (occur) => {
                     const currentDate = new Date(
                        occur.date
                     )
                     const sameMonth =
                        currentDate.getMonth() ===
                        date.getMonth()
                     const sameDay =
                        currentDate.getUTCDate() ===
                        date.getDate()
                     const sameYear =
                        currentDate.getFullYear() ===
                        date.getFullYear()

                     return (
                        sameMonth &&
                        sameDay &&
                        sameYear
                     )
                  }
               )
            })
         setSelectedDay(date)
         setDaysTransactions(dailyTransactions)
         const sortedItems =
            findIncomeAndExpenseItems(
               dailyTransactions
            )
         setExpenseItems(sortedItems[0])
         setIncomeItems(sortedItems[1])
         return dailyTransactions
      }
   }

   const daysOfWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
   }

   const parseCurrentDate = (day) => {
      if (
         !day ||
         day.toDateString() ===
            new Date().toDateString()
      )
         return "Today"
      const dayName = daysOfWeek[day.getUTCDay()]
      const dayOfMonth = day.getUTCDate()
      const lastDigit = dayOfMonth
         .toString()
         .slice(-1)
      let postFix = "th"

      if (
         lastDigit === "1" &&
         (dayOfMonth < 10 || dayOfMonth > 13)
      ) {
         postFix = "st"
      } else if (
         lastDigit === "2" &&
         (dayOfMonth < 10 || dayOfMonth > 13)
      ) {
         postFix = "nd"
      } else if (
         lastDigit === "3" &&
         (dayOfMonth < 10 || dayOfMonth > 13)
      ) {
         postFix = "rd"
      }
      return `${dayName} ${dayOfMonth}${postFix}`
   }

   const removeNegativeSign = (val) =>
      val.slice(1)

   const findIncomeAndExpenseItems = (items) => {
      const expenseItems = items.filter(
         (item) => {
            return item.amount[0] === "-"
         }
      )
      const incomeItems = items.filter((item) => {
         return item.amount[0] !== "-"
      })

      return [expenseItems, incomeItems]
   }

   useEffect(() => {
      if (transactionOccurrences) {
         const transactions =
            filterTransactions(selectedDay)
         setDaysTransactions(transactions)
      }
   }, [
      transactionOccurrences,
      userData,
      userAccounts,
      userTransactions,
      transactionOccurrences
   ])

   const handleDelete = async (itemId) => {
      await fetch(`api/transaction/delete/${itemId}`)
         .then(data => console.log(data))
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
            <div className="landing__transactions">
               <div className="landing__transaction-category">
                  <h1 className="landing__transaction-header">
                     {parseCurrentDate(
                        selectedDay
                     )}
                  </h1>
                  <h2 className="landing__category-header">
                     Expenses
                  </h2>
                  <ul className="landing__category-body">
                     {expenseItems &&
                        expenseItems.flatMap(
                           (occur, idx) => {
                              const name =
                                 userTransactions.find(
                                    (item) => {
                                       return (
                                          item.id ===
                                          occur.transactionId
                                       )
                                    }
                                 ).name
                              const isRecurrent =
                                 userTransactions.find(
                                    (item) => {
                                       return (
                                          item.id ===
                                          occur.transactionId
                                       )
                                    }
                                 ).iterations > 1
                              const isOverdue =
                                 !occur.isSettled &&
                                 new Date() >
                                    new Date(
                                       occur.date
                                    )

                              return (
                                 <Box
                                    key={idx}
                                    display="flex"
                                    sx={{
                                       width: {
                                          xs: "80%",
                                          md: "60%",
                                          justifyContent:
                                             "space-between",
                                          alignItems:
                                             "center"
                                       }
                                    }}
                                 >
                                    <Box>
                                       {occur.isSettled ? (
                                          <CheckIcon
                                             sx={{
                                                color: "green"
                                             }}
                                          />
                                       ) : isOverdue ? (
                                          <span>
                                             <ReportGmailerrorredIcon
                                                sx={{
                                                   color: "orange"
                                                }}
                                             />
                                             &nbsp;&nbsp;
                                          </span>
                                       ) : (
                                          <span>
                                             <UpcomingIcon />
                                             &nbsp;&nbsp;
                                          </span>
                                       )}
                                       {name}: $
                                       {Number(
                                          removeNegativeSign(
                                             occur.amount
                                          )
                                       ).toFixed(
                                          2
                                       )}
                                       &nbsp;
                                       {isRecurrent && (
                                          <CachedIcon />
                                       )}
                                    </Box>
                                    <DeleteIcon 
                                       sx={{
                                          fontSize: {
                                             xs: '1.5rem',
                                             sm: '2rem'
                                          }
                                       }}
                                       onClick={() => handleDelete(occur.transactionId)}
                                    />
                                 </Box>
                              )
                           }
                        )}
                  </ul>
               </div>
               <div className="landing__transaction-category">
                  <h2 className="landing__category-header">
                     Income
                  </h2>
                  <ul className="landing__category-body">
                     {incomeItems &&
                        incomeItems.flatMap(
                           (occur, idx) => {
                              const name =
                                 userTransactions.find(
                                    (item) => {
                                       return (
                                          item.id ===
                                          occur.transactionId
                                       )
                                    }
                                 ).name
                              const isRecurrent =
                                 userTransactions.find(
                                    (item) => {
                                       return (
                                          item.id ===
                                          occur.transactionId
                                       )
                                    }
                                 ).iterations > 1
                              const isOverdue =
                                 !occur.isSettled &&
                                 new Date() >
                                    new Date(
                                       occur.date
                                    )
                              return (
                                 <Box
                                    key={idx}
                                    sx={{
                                       width: {
                                          xs: "80%",
                                          md: "60%",
                                          justifyContent:
                                             "space-between",
                                          alignItems:
                                             "center"
                                       }
                                    }}
                                 >
                                    <Box>
                                       {occur.isSettled ? (
                                          <CheckIcon
                                             sx={{
                                                color: "green"
                                             }}
                                          />
                                       ) : isOverdue ? (
                                          <span>
                                             <ReportGmailerrorredIcon
                                                sx={{
                                                   color: "orange"
                                                }}
                                             />
                                             &nbsp;&nbsp;
                                          </span>
                                       ) : (
                                          <span>
                                             <UpcomingIcon />
                                             &nbsp;&nbsp;
                                          </span>
                                       )}
                                       {name}: $
                                       {Number(
                                          occur.amount
                                       ).toFixed(
                                          2
                                       )}
                                       &nbsp;
                                       {isRecurrent && (
                                          <CachedIcon />
                                       )}
                                    </Box>
                                    <DeleteIcon 
                                       sx={{
                                          fontSize: {
                                             xs: '1.5rem',
                                             sm: '2rem'
                                          }
                                       }}
                                       onClick={() => handleDelete(occur.transactionId)}
                                    />
                                 </Box>
                              )
                           }
                        )}
                  </ul>
               </div>
            </div>
         </Container>
      </section>
   )
}
