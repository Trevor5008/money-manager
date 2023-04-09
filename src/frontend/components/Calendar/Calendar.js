import { useState, useEffect } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";

function ServerDay(props) {
   const { day, items, onClick, ...other } = props;
   const [itemDays, setItemDays] = useState(null);
   const [isSelected, setIsSelected] = useState(false);

   useEffect(() => {
      if (items) {
         const daysWithItems = items.map((item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const day = date.getUTCDate();
            return `${month}-${day}`;
         });

         const getCurrentDate = (currentDate) => {
            const date = new Date(currentDate);
            const month = date.getMonth() + 1;
            const day = date.getUTCDate();
            return `${month}-${day}`;
         }
         const currentDate = getCurrentDate(day.$d);
         setItemDays(daysWithItems);
         setIsSelected(daysWithItems.indexOf(currentDate) >= 0);
      }
   }, [day, items]);

   return (
      <Badge
         className="calendar__date--event"
         key={props.day.toString()}
         overlap="circular"
         badgeContent={isSelected ? "🌚" : null}
         showZero={false}
      >
         <PickersDay {...other} day={day} onClick={() => onClick(day)} />
      </Badge>
   );
}

function Calendar({ handleDaySelect, items }) {
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
                     items={items}
                  />
               ),
            }}
         />
      </LocalizationProvider>
   );
}

export default Calendar;
