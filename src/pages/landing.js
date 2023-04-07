import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import NavBar from '../frontend/components/NavBar/NavBar';
import Calendar from "../frontend/components/Calendar/Calendar";
import axios from "axios";

export default function Landing({ handleSwitch }) {
   const session = useSession();
   const [userData, setUserData] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const [selectedDay, setSelectedDay] = useState(new Date());

   useEffect(() => {
      setLoading(true);
      if (session.data) {
         axios.get(`/api/get_user/${session.data.user.id}`).then((data) => {
            setUserData(data.data);
            setLoading(false);
         });
      }
   }, [session]);

   const handleDaySelect = (day) => {
      setSelectedDay(day.$d);
   }

   if (isLoading) return <p>Loading...</p>;
   if (!userData) return <p>No profile data</p>;

   return (
      <section className="dashboard">
         <NavBar handleSwitch={handleSwitch} selectedDay={selectedDay}/>
         <Calendar handleDaySelect={handleDaySelect}/>
         <div className="dashboard__transactions">
            <div className="dashboard__transaction-category">
               <h2 className="dashboard__transaction-header">Expenses</h2>
               <ul className="dashboard__transaction-body">
                  <li>
                     {userData.name} ${userData.email}
                  </li>
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
