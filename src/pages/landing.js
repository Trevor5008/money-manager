import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import NavBar from "../frontend/components/NavBar/NavBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Calendar from "../frontend/components/Calendar/Calendar";
import axios from "axios";

export default function Landing({ handleSwitch }) {
   const session = useSession();
   const [userData, setUserData] = useState(null);
   const [userAccounts, setUserAccounts] = useState(null);
   const [userTransactions, setUserTransactions] = useState(null);
   const [transactionOccurrences, setTransactionOccurrences] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const [selectedDay, setSelectedDay] = useState(new Date());
   const [daysTransactions, setDaysTransactions] = useState(null);
   const [expenseItems, setExpenseItems] = useState(null);
   const [incomeItems, setIncomeItems] = useState(null);

   useEffect(() => {
      setLoading(true);
      if (session.data) {
         axios
            .get(`/api/get_user/${session.data.user.id}`)
            .then((data) => {
               setUserData(data.data);
               if (data.data.hasOwnProperty("ledgerAccounts")) {
                  setUserAccounts(data.data.ledgerAccounts);
               }
               return data.data;
            })
            .then((userData) => {
               if (userData.ledgerAccounts[0].hasOwnProperty("transactions")) {
                  const transactions = userData.ledgerAccounts.flatMap(
                     (acct) => {
                        return acct.transactions;
                     }
                  );
                  setUserTransactions(transactions);
                  const dailyTransactions = transactions.flatMap((item) => {
                     return item.transactionOccurrences;
                  });
                  if (dailyTransactions.length > 0) {
                     setTransactionOccurrences(dailyTransactions);
                  } else {
                     setTransactionOccurrences(null);
                  }
               }
               const daysTransactions = filterTransactions(selectedDay);
               setDaysTransactions(daysTransactions);
               return userTransactions;
            })
            .finally(() => {
               setLoading(false);
            });
      }
   }, [session]);

   const filterTransactions = (day) => {
      if (!userTransactions || !day) return;
      const date = day.hasOwnProperty("$d") ? day.$d : day;
      if (userTransactions) {
         const dailyTransactions = userTransactions.flatMap((item) => {
            return item.transactionOccurrences.filter((occur) => {
               const currentDate = new Date(occur.date);
               const sameMonth = currentDate.getMonth() === date.getMonth();
               const sameDay = currentDate.getUTCDate() === date.getDate();
               const sameYear =
                  currentDate.getFullYear() === date.getFullYear();

               return sameMonth && sameDay && sameYear;
            });
         });
         setSelectedDay(date);
         setDaysTransactions(dailyTransactions);
         const sortedItems = findIncomeAndExpenseItems(dailyTransactions);
         setExpenseItems(sortedItems[0]);
         setIncomeItems(sortedItems[1]);
         return dailyTransactions;
      }
   };

   const daysOfWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
   };

   const parseCurrentDate = (day) => {
      if (!day || day.toDateString() === new Date().toDateString())
         return "Today";
      const dayName = daysOfWeek[day.getUTCDay()];
      const dayOfMonth = day.getUTCDate();
      const lastDigit = dayOfMonth.toString().slice(-1);
      let postFix = "th";

      if (lastDigit === "1" && (dayOfMonth < 10 || dayOfMonth > 13)) {
         postFix = "st";
      } else if (lastDigit === "2" && (dayOfMonth < 10 || dayOfMonth > 13)) {
         postFix = "nd";
      } else if (lastDigit === "3" && (dayOfMonth < 10 || dayOfMonth > 13)) {
         postFix = "rd";
      }
      return `${dayName} ${dayOfMonth}${postFix}`;
   };

   const removeNegativeSign = (val) => val.slice(1);

   const findIncomeAndExpenseItems = (items) => {
      const expenseItems = items.filter((item) => {
         return item.amount[0] === "-";
      });
      const incomeItems = items.filter((item) => {
         return item.amount[0] !== "-";
      });
      return [expenseItems, incomeItems];
   };

   useEffect(() => {
      if (transactionOccurrences) {
         const transactions = filterTransactions(selectedDay);
         setDaysTransactions(transactions);
      }
   }, [transactionOccurrences]);

   if (isLoading) return <p>Loading...</p>;
   if (!userData) return <p>No profile data</p>;

   return (
      <section className="dashboard">
         <NavBar handleSwitch={handleSwitch} selectedDay={selectedDay} />
         <Container className="dashboard__main">
            <Paper className="dashboard__content">
               <Calendar
                  handleDaySelect={filterTransactions}
                  items={transactionOccurrences}
                  selectedDay={selectedDay}
               />
               <div className="dashboard__transactions">
                  <div className="dashboard__transaction-category">
                     <h1 className="dashboard__transaction-header">
                        {parseCurrentDate(selectedDay)}
                     </h1>
                     <h2 className="dashboard__category-header">Expenses</h2>
                     <ul className="dashboard__category-body">
                        {expenseItems &&
                           expenseItems.flatMap((occur, idx) => {
                              const name = userTransactions.find((item) => {
                                 return item.id === occur.transactionId;
                              }).name;
                              return (
                                 <li key={idx}>
                                    {name}: ${removeNegativeSign(occur.amount)}
                                 </li>
                              );
                           })}
                     </ul>
                  </div>
                  <div className="dashboard__transaction-category">
                     <h2 className="dashboard__category-header">Income</h2>
                     <ul className="dashboard__category-body">
                        {incomeItems &&
                           incomeItems.flatMap((occur, idx) => {
                              const name = userTransactions.find((item) => {
                                 return item.id === occur.transactionId;
                              }).name;
                              return (
                                 <li key={idx}>
                                    {name}: ${occur.amount}
                                 </li>
                              );
                           })}
                     </ul>
                  </div>
               </div>
            </Paper>
         </Container>
      </section>
   );
}
