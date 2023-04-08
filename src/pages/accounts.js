import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavBar from "../frontend/components/NavBar/NavBar";
import Image from "next/image";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Accounts({ handleSwitch }) {
   const session = useSession();
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(true);
   const [userData, setUserData] = useState(null);
   
   useEffect(() => {
      setIsLoading(true);
      if (session.data) {
         axios.get(`/api/get_user/${session.data.user.id}`).then((data) => {
            setUserData(data.data);
            setIsLoading(false);
         });
      }
   }, [session]);

   if (isLoading) return <h1>Loading...</h1>;

   return (
      <>
         <NavBar handleSwitch={handleSwitch} />
         <section className="accounts">
            <h1 className="accounts__title">Accounts: </h1>
            {userData && userData.ledgerAccounts.map((account, idx) => {
               const image = account.accountType.icon;
               return (
                  <div key={idx} className="accounts__account">
                     <div className="accounts__subtitle">
                        <Image
                           width={100}
                           height={100}
                           className="item-icon"
                           src={`/assets/fontawesome/images/${image}`}
                           alt={image.split(".")[0]}
                        />
                        <h2 className="accounts__account-name">
                           {account.name}
                        </h2>
                     </div>
                     <div className="accounts__account-details">
                        <h3>Balance: ${account.startingBalance}</h3>
                        <h5>{account.description}</h5>
                     </div>
                  </div>
               );
            })}
            <div className="accounts__btn-container">
               <Button
                  variant="contained"
                  className="accounts__addBtn"
                  onClick={() =>
                     router.push({
                        pathname: "/accounts/add",
                        query: { id: session.data.user.id },
                     })
                  }
               >
                  Add Account:
               </Button>
            </div>
         </section>
      </>
   );
}
