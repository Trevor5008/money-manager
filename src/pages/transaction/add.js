import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import NavBar from "../../frontend/components/NavBar/NavBar";
import axios from "axios";

export default function Transaction({ handleSwitch }) {
   const router = useRouter();
   const [transactionTypes, setTransactionTypes] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      axios.get(`/api/transaction_types`).then((data) => {
         setTransactionTypes(data.data);
      });
   }, []);

   const handleSubmit = (evt) => {
      evt.preventDefault();
      const transactionType = evt.target["transaction_types"].value;
      const transactionTypeId = 
         transactionTypes.find(acct => acct.type === transactionType).id;
      const userId = router.query.id;
      const transactionName = evt.target["transaction_name"].value;
      const startBalance = evt.target["start_balance"].value;
      const openedDate = evt.target["open_date"].value;
      const description = evt.target.description.value;
      console.log({transactionTypeId, userId, transactionName, startBalance, openedDate, description});
      console.log("submitted...");
   };

   return (
      <> 
         <NavBar handleSwitch={handleSwitch}/>
         <form className="transaction-add__form" onSubmit={handleSubmit}>
            <h1 className="transaction-add__title">Add a Transaction: </h1>
            {transactionTypes && (
               <>
                  <label htmlFor="transaction_types" className="transaction-add__input-group">
                     Select an transaction Type:
                     <select name="transaction_types">
                        {transactionTypes.map((transactionType, idx) => {
                           return (
                              <option key={idx} value={transactionType.type}>
                                 {transactionType.type}
                              </option>
                           );
                        })}
                     </select>
                  </label>
                  <label htmlFor="transaction_name" className="transaction-add__input-group">
                     transaction Name:
                     <input type="text" name="transaction_name"/>
                  </label>
                  <label htmlFor="start_balance" className="transaction-add__input-group">Starting Balance:
                     <input type="number" name="start_balance"/>
                  </label>
                  <label htmlFor="open_date" className="transaction-add__input-group">Opened On:
                     <input type="date" name="open_date"/>
                  </label>
                  <label htmlFor="description" className="transaction-add__input-group">Description:
                     <input type="textarea" name="description"/>
                  </label>
               </>
            )}
            <Button type="submit">Add Transaction</Button>
         </form>
      </>
   );
}
