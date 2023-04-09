import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import NavBar from "../frontend/components/NavBar/NavBar";
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
            return item.transactionOccurrences.filter((occur) => {
              const date = new Date(occur.date);
              const sameMonth =
                date.getMonth() === selectedDay.getMonth();
              const sameDay =
                date.getUTCDate() === selectedDay.getDate();
              const sameYear =
                date.getFullYear() === selectedDay.getFullYear();
              return sameMonth && sameDay && sameYear;
            });
          });
          if (dailyTransactions.length > 0) {
            setTransactionOccurrences(dailyTransactions);
          } else {
            setTransactionOccurrences(null);
          }
        }
        return userTransactions;
      })
      .finally(() => {
        setLoading(false);
      });
  }
}, []);

   const handleDaySelect = (day) => {
      const dailyTransactions = userTransactions.flatMap((item) => {
         return item.transactionOccurrences.filter((occur) => {
            const date = new Date(occur.date);
            const sameMonth = date.getMonth() === day.$d.getMonth();
            const sameDay = date.getUTCDate() === day.$d.getDate();
            const sameYear = date.getFullYear() === day.$d.getFullYear();
            return sameMonth && sameDay && sameYear;
         });
      });
      if (dailyTransactions.length > 0) {
         setTransactionOccurrences(dailyTransactions);
      } else {
         setTransactionOccurrences(null);
      }
      setSelectedDay(day.$d);
   };

   if (isLoading) return <p>Loading...</p>;
   if (!userData) return <p>No profile data</p>;

   return (
      <section className="dashboard">
         <NavBar handleSwitch={handleSwitch} selectedDay={selectedDay} />
         <Calendar 
            handleDaySelect={handleDaySelect} 
            items={transactionOccurrences}
         />
         <div className="dashboard__transactions">
            <div className="dashboard__transaction-category">
               <h2 className="dashboard__transaction-header">Expenses</h2>
               <ul className="dashboard__transaction-body">
                  {transactionOccurrences &&
                     transactionOccurrences.flatMap((occur, idx) => {
                        const name = userTransactions.find(item => {
                           return item.id === occur.transactionId
                     }).name;
                        return <li key={idx}>{name}: ${occur.amount}</li>
                     })
                  }
               </ul>
            </div>
            <div className="dashboard__transaction-category">
               <h2 className="dashboard__transaction-header">Income</h2>
               <ul className="dashboard__transaction-body">
                  {/* <li>{userData.income.name} ${userData.income.amount}</li> */}
               </ul>
            </div>
         </div>
      </section>
   );
}
