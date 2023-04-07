import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import axios from "axios";

export default function AddAccount() {
   const router = useRouter();
   const [accountTypes, setAccountTypes] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      axios.get(`/api/account_types`).then((data) => {
         setAccountTypes(data.data);
      });
   }, []);

   const handleSubmit = (evt) => {
      evt.preventDefault();
      const accountType = evt.target["account_types"].value;
      const accountTypeId = 
         accountTypes.find(acct => acct.type === accountType).id;
      const userId = router.query.id;
      const accountName = evt.target["account_name"].value;
      const startBalance = evt.target["start_balance"].value;
      const openedDate = evt.target["open_date"].value;
      const description = evt.target.description.value;
      console.log({accountTypeId, userId, accountName, startBalance, openedDate, description});

      axios.post(`http://localhost:3000/api/add_account/${router.query.id}`,
         {
            accountTypeId, 
            userId, 
            accountName, 
            startBalance, 
            openedDate, 
            description
         }
      )
      .then(data => console.log(data))
      .then(() => router.back());
   };

   return (
      <>
         <h1 className="account-add__title">Add an Account</h1>
         <form onSubmit={handleSubmit} className="account-add__form">
            {accountTypes && (
               <>
                  <label htmlFor="account_types" className="account-add__input-group">
                     Select an Account Type:
                     <select name="account_types">
                        {accountTypes.map((accountType, idx) => {
                           return (
                              <option key={idx} value={accountType.type}>
                                 {accountType.type}
                              </option>
                           );
                        })}
                     </select>
                  </label>
                  <label htmlFor="account_name" className="account-add__input-group">
                     Account Name:
                     <input type="text" name="account_name"/>
                  </label>
                  <label htmlFor="start_balance" className="account-add__input-group">Starting Balance:
                     <input type="number" name="start_balance"/>
                  </label>
                  <label htmlFor="open_date" className="account-add__input-group">Opened On:
                     <input type="date" name="open_date"/>
                  </label>
                  <label htmlFor="description" className="account-add__input-group">Description:
                     <input type="textarea" name="description"/>
                  </label>
               </>
            )}
            <Button type="submit">Add Account</Button>
         </form>
      </>
   );
}
