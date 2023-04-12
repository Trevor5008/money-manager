import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import NavBar from "../../frontend/components/NavBar/NavBar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

export default function AddAccount({ handleSwitch }) {
   const router = useRouter();
   const [accountTypes, setAccountTypes] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedDate, setSelectedDate] = useState(null);

   useEffect(() => {
      axios.get(`/api/account_types`).then((data) => {
         setAccountTypes(data.data);
      });
   }, []);

   const handleSubmit = (evt) => {
      evt.preventDefault();
      const accountType = evt.target["account_types"].value;
      const accountTypeId = accountTypes.find(
         (acct) => acct.type === accountType
      ).id;

      const accountName = evt.target["account_name"].value;
      const startBalance = evt.target["start_balance"].value;
      const description = evt.target.description?.value ?? null;
      const openedDate = selectedDate.$d;
      const userId = router.query.id;

      axios
         .post(`http://localhost:3000/api/add_account/${router.query.id}`, {
            accountTypeId,
            accountName,
            userId,
            startBalance,
            openedDate,
            description,
         })
         .then((data) => console.log(data))
         .then(() => router.back());
   };

   return (
      <section className="account-add">
         <NavBar handleSwitch={handleSwitch} />
         <h1 className="account-add__title">Add an Account</h1>
         <form onSubmit={handleSubmit} className="account-add__form">
            <Box
               sx={{ minWidth: 120 }}
               className="account-add__input-container"
            >
               <FormControl fullWidth>
                  <InputLabel 
                     id="account_types"
                     sx={{
                        fontSize: 12
                     }}
                  >
                     Account Type:
                  </InputLabel>
                  <Select
                     labelId="account_types"
                     id="account_types"
                     label="Account Type"
                     name="account_types"
                  >
                     {accountTypes &&
                        accountTypes.map((accountType, idx) => {
                           return (
                              <MenuItem key={idx} value={accountType.type}>
                                 {accountType.type}
                              </MenuItem>
                           );
                        })}
                  </Select>
               </FormControl>
            </Box>
            <TextField
               id="account_name"
               label="Account Name"
               variant="outlined"
               name="account_name"
            />
            <Box
               sx={{ minWidth: 120 }}
               className="account-add__input-container"
            >
               <FormControl fullWidth>
                  <InputLabel 
                     htmlFor="account_start_balance"
                     sx={{
                        fontSize: 12
                     }}
                  >
                     Starting Balance
                  </InputLabel>
                  <OutlinedInput
                     id="account_start_balance"
                     startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                     }
                     label="Starting Balance"
                     name="start_balance"
                  />
               </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                     label="Opened on:"
                     onChange={(newDate) => {
                        setSelectedDate(newDate);
                     }}
                     value={selectedDate}
                  />
               </DemoContainer>
            </LocalizationProvider>
            <TextField
               id="account_description"
               label="Description"
               variant="outlined"
               multiline
               maxRows={4}
            />
            <Button 
               type="submit"
               variant="contained"
            >
               Add Account
            </Button>
            <Button 
               variant="test"
               onClick={() => router.push('/')}
               sx={{
                  fontSize: 11
               }}
            >
               Cancel
            </Button>
         </form>
      </section>
   );
}
