import Calendar from '../frontend/components/Calendar/Calendar';

export default function Landing({ userData }) {
   return (
      <section className='dashboard'>
         <Calendar />
         <div className='dashboard__transactions'>
            <div className="dashboard__transaction-category">
               <h2 className='dashboard__transaction-header'>Expenses</h2>
               <ul className="dashboard__transaction-body">
                  {/* <li>{userData.expenses.name} ${userData.expenses.amount}</li> */}
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