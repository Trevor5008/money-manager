import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";
import NavBar from "../../frontend/components/NavBar/NavBar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function Transaction({ handleSwitch }) {
   const [transactionTypes, setTransactionTypes] = useState(null);
   const [accounts, setAccounts] = useState(null);
   const [recurrenceOptions, setRecurrenceOptions] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [onDate, setOnDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
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

   const calcIterations = (startDate, endDate, recurPeriod) => {
      const oneDay = 1000 * 60 * 60 * 24;
      const oneWeek = oneDay * 7;
      const oneMonth = oneWeek * 4;
      const oneQuarter = oneMonth * 3;
      const oneYear = oneQuarter * 4;

      let difference;
      const diffInMilliseconds = endDate.getTime() - startDate.getTime();

      if (recurPeriod === "Daily") {
         difference = Math.floor(diffInMilliseconds / oneDay);
      } else if (recurPeriod === "Weekly") {
         difference = Math.floor(diffInMilliseconds / oneWeek);
      } else if (recurPeriod === "Monthly") {
         difference = Math.floor(diffInMilliseconds / oneMonth);
      } else if (recurPeriod === "Quarterly") {
         difference = Math.floor(diffInMilliseconds / oneQuarter);
      } else {
         difference = Math.floor(diffInMilliseconds / oneYear);
      }
      return difference;
   };

   const handleSubmit = (evt) => {
      evt.preventDefault();
      const category = evt.target.category.value;
      const account = evt.target.account.value;
      const accountId = accounts.find((acct) => {
         return acct.name === account;
      }).id;
      const transactionType = evt.target["transaction_type"].value;
      const transactionTypeId = transactionTypes.find((type) => {
         return type.type === transactionType;
      }).id;
      const name = evt.target.name.value;
      const amount = evt.target.amount.value;
      const recurrence = evt.target.recurrence?.value || null;
      const recurrenceId =
         recurrenceOptions.find((option) => {
            return option.type === recurrence;
         })?.id || null;
      const specificDay = evt.target.specificDay?.value || null;
      const description = evt.target.description?.value || null;
      const iterations =
         isRecurring && !endDate
            ? 100
            : endDate
            ? calcIterations(onDate.$d, endDate.$d, recurrence)
            : 1;

      axios
         .post(`/api/transaction/add`, {
            accountId,
            transactionTypeId,
            name,
            category,
            amount,
            onDate,
            iterations,
            recurrenceId,
            recurrence,
            specificDay,
            endDate,
            description,
            isSettled,
         })
         .then((data) => console.log(data));
      router.push("/landing");
      console.log("transaction added...");
   };

   return (
      <>
         <NavBar handleSwitch={handleSwitch} />
         <form className="transaction-add__form" onSubmit={handleSubmit}>
            <h1 className="transaction-add__title">Add a Transaction: </h1>
            <FormControl>
               <FormLabel id="transaction-add__category">Category:</FormLabel>
               <RadioGroup
                  row
                  aria-labelledby="category select"
                  name="category"
                  defaultValue={"expense"}
               >
                  <FormControlLabel
                     value="expense"
                     control={<Radio />}
                     label="Expense"
                  />
                  <FormControlLabel
                     value="income"
                     control={<Radio />}
                     label="Income"
                  />
                  <FormControlLabel
                     value="transfer"
                     control={<Radio />}
                     label="Transfer"
                  />
               </RadioGroup>
            </FormControl>
            <Box
               sx={{ minWidth: 120 }}
               className="transaction-add__input-container"
            >
               <FormControl fullWidth>
                  <InputLabel id="transaction_accounts">
                     Account:
                  </InputLabel>
                  <Select
                     labelId="transaction_accounts"
                     id="transaction_accounts"
                     label="Account"
                     name="account"
                  >
                     {accounts &&
                        accounts.map((account, idx) => {
                           return (
                              <MenuItem key={idx} value={account.name}>
                                 {account.name}
                              </MenuItem>
                           );
                        })}
                  </Select>
               </FormControl>
               <FormControl fullWidth>
                  <InputLabel id="transaction_types">
                     Transaction Type:
                  </InputLabel>
                  <Select
                     labelId="transaction_types"
                     id="transaction_types"
                     label="Transaction Type"
                     name="transaction_type"
                  >
                     {transactionTypes &&
                        transactionTypes.map((category, idx) => {
                           return (
                              <MenuItem key={idx} value={category.type}>
                                 {category.type}
                              </MenuItem>
                           );
                        })}
                  </Select>
               </FormControl>
            </Box>
            <TextField
               id="transaction_name"
               label="Name (Optional)"
               variant="outlined"
               name="transaction_name"
            />
            <FormControl fullWidth>
               <InputLabel htmlFor="transaction_amount">Amount</InputLabel>
               <OutlinedInput
                  id="transaction_amount"
                  startAdornment={
                     <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                  name="amount"
               />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                     label="Transaction Date:"
                     onChange={(newDate) => {
                        setOnDate(newDate);
                     }}
                     value={onDate}
                  />
               </DemoContainer>
            </LocalizationProvider>
            <FormControlLabel
               value={isRecurring}
               control={<Switch color="primary" />}
               label="Recurring?"
               labelPlacement="start"
               onClick={() => setIsRecurring(!isRecurring)}
            />
            {isRecurring && (
               <>
                  <FormControl fullWidth>
                     <InputLabel id="recurrence">Recurs:</InputLabel>
                     <Select
                        labelId="recurrence_period"
                        id="recurrence"
                        label="Recurs:"
                        name="recurrence"
                     >
                        {recurrenceOptions &&
                           recurrenceOptions.map((option, idx) => {
                              return (
                                 <MenuItem key={idx} value={option.type}>
                                    {option.type}
                                 </MenuItem>
                              );
                           })}
                     </Select>
                  </FormControl>
                  <TextField
                     id="specific_day"
                     label="Specific Day:"
                     variant="outlined"
                     name="specificDay"
                     type="number"
                     min={1}
                     max={31}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                           label="End Date:"
                           onChange={(newDate) => {
                              setEndDate(newDate);
                           }}
                           value={endDate}
                        />
                     </DemoContainer>
                  </LocalizationProvider>
               </>
            )}
            <TextField
               id="transaction_description"
               label="Description"
               variant="outlined"
               multiline
               maxRows={4}
            />
            <FormControlLabel
               value={isSettled}
               control={<Switch color="primary" />}
               label="Settled?"
               labelPlacement="start"
               onClick={() => setIsSettled(!isSettled)}
            />
            <Button variant="contained" type="submit">
               Add Transaction
            </Button>
            <Button 
               variant="test"
               onClick={() => router.push('/')}
            >
               Cancel
            </Button>
         </form>
      </>
   );
}
