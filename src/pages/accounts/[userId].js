import { useState } from 'react';
import Router from 'next/router';


export async function getServerSideProps(ctx) {

   const { userId } = ctx.query;
   const res =
      await fetch(`http://localhost:3000/api/accounts/${userId}`);

   const userData = await res.json();

   return {
      props: {
         userData
      }
   };
};

export default function Accounts({ userData }) {
   const [userAccounts, setUserAccounts] = useState(userData || null);

   return (
      <>
         <h1>{userAccounts[0].owner}'s Accounts: </h1>
         {userAccounts.map((account, idx) => {
            return (
               <div key={idx}>
                  <h2>{account.name}</h2>
                  <h3>Starting Balance: ${account.starting_balance}</h3>
                  <h5>{account.description}</h5>
               </div>
            )
         })}
      </>
   );
}