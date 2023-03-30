import Calendar from '../../frontend/components/Calendar/Calendar';

export default function Dashboard() {
   const time = Date.now();
   const date = new Date(time);
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const today = date.getDate();

   return (
      <section className='dashboard'>
         <Calendar year={year} month={month} today={today}/>
         <div className='dashboard__transactions'>
            <div className="dashboard__transaction-category">
               <h2 className='dashboard__transaction-header'>Expenses</h2>
               <ul className="dashboard__transaction-body">
                  <li>Home Repairs $1100.00</li>
               </ul>
            </div>
            <div className="dashboard__transaction-category">
               <h2 className='dashboard__transaction-header'>Income</h2>
               <ul className="dashboard__transaction-body">
                  <li>Rideshare $200.00</li>
               </ul>
            </div>
         </div>
      </section>
   );
};