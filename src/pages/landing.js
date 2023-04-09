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
        axios.get(`/api/get_user/${session.data.user.id}`)
          .then((data) => {
            setUserData(data.data);
            if (data.data.hasOwnProperty("ledgerAccounts")) {
              setUserAccounts(data.data.ledgerAccounts);
            }
            return data.data;
          })
          .then((userData) => {
            if (userData.ledgerAccounts[0].hasOwnProperty('transactions')) {
              const transactions = userData.ledgerAccounts.map((acct) => {
                return acct.transactions;
              });
              setUserTransactions(...transactions);
            }
            return userTransactions;
          })
          .then((transactions) => {
            if (transactions[0].hasOwnProperty('transactionOccurrences')) {
              const dailyTransactions = transactions.flatMap((item) => {
                return item.transactionOccurrences.map((occur) => {
                  const date = new Date(occur.date);
                  const sameMonth = date.getMonth() === selectedDay.getMonth();
                  const sameDay = date.getUTCDate() === selectedDay.getDate();
                  const sameYear = date.getFullYear() === selectedDay.getFullYear();
                  if (sameMonth && sameDay && sameYear) {
                    return occur;
                  }
                });
              });
              setTransactionOccurrences(dailyTransactions);
            }
          })
          .finally(() => {
            setLoading(false)
          });
      }
    }, []);
    

   const handleDaySelect = (day) => {
      // setSelectedDay(day.$d);
      // // const dailyTransactions = userTransactions.flatMap((item) => {
      // //    return item.transactionOccurrences.map((occur) => {
      // //      const date = new Date(occur.date);
      // //      const sameMonth = date.getMonth() === selectedDay.getMonth();
      // //      const sameDay = date.getUTCDate() === selectedDay.getDate();
      // //      const sameYear = date.getFullYear() === selectedDay.getFullYear();
      // //      if (sameMonth && sameDay && sameYear) {
      // //        return occur;
      // //      }
      // //    });
      // //  });
      //  setTransactionOccurrences(dailyTransactions);
   };

   if (isLoading) return <p>Loading...</p>;
   if (!userData) return <p>No profile data</p>;

   return (
      <section className="dashboard">
         <NavBar handleSwitch={handleSwitch} selectedDay={selectedDay} />
         <Calendar handleDaySelect={handleDaySelect} />
         <div className="dashboard__transactions">
            <div className="dashboard__transaction-category">
               <h2 className="dashboard__transaction-header">Expenses</h2>
               <ul className="dashboard__transaction-body">
                  {transactionOccurrences && transactionOccurrences.map((occur, idx) => {
                     const name = userTransactions.find(item => {
                        return item.id === occur.transactionId;
                     }).name;
                     return <li key={idx}>{name} for {occur.amount}</li>;
                  })}
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
