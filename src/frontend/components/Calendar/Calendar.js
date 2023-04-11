import { useState, useEffect } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp';
import Badge from "@mui/material/Badge";

function ServerDay(props) {
   const { day, itemDays, onClick, ...other } = props;
   const [hasItems, setHasItems] = useState(false);

   useEffect(() => {
      if (itemDays) {
         const getCurrentDate = (currentDate) => {
            const date = new Date(currentDate);
            const month = date.getMonth() + 1;
            const day = date.getUTCDate();
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
         };
         const parsedDate = getCurrentDate(day.$d);
         const hasItems = itemDays.indexOf(parsedDate) >= 0;
         setHasItems(hasItems);
      }
   }, [itemDays]);

   return (
      <Badge
         className="calendar__date--event"
         key={props.day.toString()}
         overlap="circular"
         badgeContent={hasItems && 
            <WatchLaterSharpIcon 
               sx={{
                  fontSize: 1
               }}
            />}
         showZero={false}
      >
         <PickersDay 
            className="calendar__selection" 
            {...other} 
            day={day} 
            onClick={() => onClick(day)} 
         />
      </Badge>
   );
}

function Calendar({ handleDaySelect, items, selectedDay }) {
   const [itemDays, setItemDays] = useState(false);

   useEffect(() => {
      if (items) {
         const daysWithItems = items.map((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const day = date.getUTCDate();
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
         });
         setItemDays(daysWithItems);
      }
   }, [items, selectedDay]);

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateCalendar
            className="calendar"
            showDaysOutsideCurrentMonth
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
               day: (props) => (
                  <ServerDay
                     {...props}
                     onClick={handleDaySelect}
                     itemDays={itemDays}
                  />
               ),
            }}
         />
      </LocalizationProvider>
   );
}

export default Calendar;
