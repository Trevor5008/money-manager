import Calendar from '../frontend/components/Calendar/Calendar';
import useSWR from 'swr';

export default function Landing() {
   // const fetcher = (...args) => 
   //    fetch(...args).then(res => res.json());
      
   // const { data, error } = useSWR('/api/get_users', fetcher)
   // if (error) return <div>An error occured.</div>
   // if (!data) return <div>Loading ...</div>

   return (
      <section className='dashboard'>
         <Calendar />
         <div className='dashboard__transactions'>
            <div className="dashboard__transaction-category">
               <h2 className='dashboard__transaction-header'>Expenses</h2>
               <ul className="dashboard__transaction-body">
                  {/* <li>{users[0].name} ${usersamount}</li> */}
               </ul>
            </div>
            <div className="dashboard__transaction-category">
               <h2 className='dashboard__transaction-header'>Income</h2>
               <ul className="dashboard__transaction-body">
                  {/* <li>{userData.income.name} ${userData.income.amount}</li> */}
               </ul>
            </div>
         </div>
      </section>
   );
};