import { useState } from 'react';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";

function ServerDay(props) {
   const { day, onClick, ...other } = props;

   return (
      <Badge
         className="calendar__date--event"
         key={props.day.toString()}
         overlap="circular"
         badgeContent={"🌚"}
      >
         <PickersDay {...other} day={day} onClick={() => onClick(day)} />
      </Badge>
   );
}

function Calendar({ handleDaySelect }) {
   const [selectedDay, setSelectedDay] = useState(new Date());

   const handleClick = (day) => {
      setSelectedDay(day.$d)
      handleDaySelect(selectedDay);
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateCalendar
            className="calendar"
            showDaysOutsideCurrentMonth
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
               day: (props) => (
                  <ServerDay {...props} onClick={handleClick}/>
               )
            }}
         />
      </LocalizationProvider>
   );
}

export default Calendar;
