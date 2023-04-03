import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

function ServerDay(props) {
   const { day, ...other } = props;

   function handleClick(e) {
      console.log(props)
   }
   return (
      <Badge
         className="calendar__date--event"
         key={props.day.toString()}
         overlap="circular"
         badgeContent={'🌚'}
      >
         <PickersDay {...other} day={day} onClick={(e) => handleClick(e)}/>
      </Badge>
   )
}
;
function Calendar() {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateCalendar 
            className="calendar"
            showDaysOutsideCurrentMonth
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
               day: ServerDay
            }}
         />
      </LocalizationProvider>
   );
}

export default Calendar;