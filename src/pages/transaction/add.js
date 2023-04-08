import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import NavBar from "../../frontend/components/NavBar/NavBar";
import axios from "axios";

export default function Transaction({ handleSwitch }) {
   const [transactionTypes, setTransactionTypes] = useState(null);
   const [accounts, setAccounts] = useState(null);
   const [recurrenceOptions, setRecurrenceOptions] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isRecurring, setIsRecurring] = useState(false);
   const [isSettled, setIsSettled] = useState(false);
   const router = useRouter();

   useEffect(() => {
      axios.get(`/api/transaction_types`).then((data) => {
         setTransactionTypes(data.data);
      });
      axios.get(`/api/accounts`).then((data) => {
         setAccounts(data.data);
      });
      axios.get(`/api/recurrence_options`).then((data) => {
         setRecurrenceOptions(data.data);
      });
   }, []);

   const calcIterations = (start, end, recurPeriod) => {
      return 10;
   }

   const handleSubmit = (evt) => {
      evt.preventDefault();
      const account = evt.target.account.value;
      const accountId = accounts.find((acct) => {
         return acct.name === account;
      }).id;
      const transactionType = evt.target.type.value;
      const transactionTypeId = transactionTypes.find((acct) => {
         return acct.type === transactionType;
      }).id;
      const name = evt.target.name.value;
      const amount = evt.target.amount.value;
      const onDate = evt.target.onDate.value;
      const recurrence = evt.target.recurrence?.value || null;
      const recurrenceId =
         recurrenceOptions.find((option) => {
            return option.type === recurrence;
         })?.id || null;
      const specificDay = evt.target.specificDay?.value || null;
      const endDate = evt.target.endDate?.value || null;
      const description = evt.target.description?.value || null;
      const iterations = 
         isRecurring && !endDate ? 100 
         : endDate 
         ? calcIterations(startDate, endDate, recurrence) : 1;

      axios.post(`/api/transaction/add`, {
         accountId,
         transactionTypeId,
         name,
         amount,
         onDate,
         iterations,
         recurrenceId,
         specificDay,
         endDate,
         description,
         isSettled,
      }).then(data => console.log(data));

      console.log("submitted...");
   };

   return (
      <>
         <NavBar handleSwitch={handleSwitch} />
         <form className="transaction-add__form" onSubmit={handleSubmit}>
            <h1 className="transaction-add__title">Add a Transaction: </h1>
            {transactionTypes && (
               <>
                  <label
                     htmlFor="transaction_account"
                     className="transaction-add__input-group"
                  >
                     Account:
                     <select name="account">
                        {accounts && accounts.map((account, idx) => {
                           return (
                              <option key={idx} value={account.name}>
                                 {account.name}
                              </option>
                           );
                        })}
                     </select>
                  </label>
                  <label
                     htmlFor="transaction_types"
                     className="transaction-add__input-group"
                  >
                     Type:
                     <select name="type">
                        {transactionTypes.map((transactionType, idx) => {
                           return (
                              <option key={idx} value={transactionType.type}>
                                 {transactionType.type}
                              </option>
                           );
                        })}
                     </select>
                  </label>
                  <label
                     htmlFor="transaction__name"
                     className="transaction-add__input-group"
                  >
                     Name: (Optional)
                     <input type="text" name="name" />
                  </label>
                  <label
                     htmlFor="amount"
                     className="transaction-add__input-group"
                  >
                     Amount:
                     <input type="text" name="amount" />
                  </label>
                  <label
                     htmlFor="start-date"
                     className="transaction-add__input-group"
                  >
                     Date:
                     <input type="date" name="onDate" />
                  </label>
                  <label
                     htmlFor="isRecurring"
                     className="transaction-add__input-group"
                     onClick={() => setIsRecurring(!isRecurring)}
                  >
                     Recurring ?:
                     <input type="checkbox" name="isRecurring" />
                  </label>
                  {isRecurring && (
                     <div className="transaction__recurring">
                        <label
                           htmlFor="recurrence"
                           className="transaction-add__input-group"
                        >
                           Recurs:
                           <select name="recurrence">
                              {recurrenceOptions.map((option, idx) => {
                                 return (
                                    <option key={idx} value={option.type}>
                                       {option.type}
                                    </option>
                                 );
                              })}
                           </select>
                        </label>
                        <label
                           htmlFor="recurrence-day"
                           className="transaction-add__input-group"
                        >
                           Specific Day:
                           <input
                              type="number"
                              name="specificDay"
                              min={1}
                              max={31}
                              placeholder="Day of the Month"
                           />
                        </label>
                        <label
                           htmlFor="recurrence-endDdate"
                           className="transaction-add__input-group"
                        >
                           Ends On:
                           <input type="date" name="endDate" />
                        </label>
                     </div>
                  )}
                  <label
                     htmlFor="description"
                     className="transaction-add__input-group"
                  >
                     Description:
                     <input type="textarea" name="description" />
                  </label>
                  <label
                     htmlFor="isSettled"
                     className="transaction-add__input-group"
                  >
                     Settled ?:
                     <input 
                        onClick={() => setIsSettled(!isSettled)} type="checkbox" 
                        name="settled" 
                        value={isSettled}
                     /> {isSettled ? 'Yes' : 'No'}
                  </label>
               </>
            )}
            <Button variant="contained" type="submit">
               Add Transaction
            </Button>
         </form>
      </>
   );
}
