/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(ctx) {
   const session = await getServerSession(ctx.req, ctx.res, authOptions);

   if (!session) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      };
   }

   return {
      props: {
         session
      }
   };
}

export default function Accounts({ userData }) {

   return (
      <>
         <h1>{userData[0].owner}'s Accounts: </h1>
         {userData.map((account, idx) => {
            return (
               <div key={idx}>
                  <h2>{account.name}</h2>
                  <h3>Starting Balance: ${account.starting_balance}</h3>
                  <h5>{account.description}</h5>
               </div>
            );
         })}
      </>
   );
}
