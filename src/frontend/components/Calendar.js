import { useState, useEffect } from "react"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton"
import { PickersDay } from "@mui/x-date-pickers/PickersDay"
import WatchLaterSharpIcon from "@mui/icons-material/WatchLaterSharp"
import Badge from "@mui/material/Badge"

function ServerDay(props) {
   const { day, itemDays, onClick, ...other } =
      props
   const [hasItems, setHasItems] = useState(false)

   useEffect(() => {
      if (itemDays) {
         const getCurrentDate = (currentDate) => {
            const date = new Date(currentDate)
            const month = date.getMonth() + 1
            const day = date.getUTCDate()
            const year = date.getFullYear()
            return `${month}-${day}-${year}`
         }
         const parsedDate = getCurrentDate(day.$d)
         const hasItems =
            itemDays.indexOf(parsedDate) >= 0
         setHasItems(hasItems)
      }
   }, [itemDays])

   return (
      <Badge
         key={props.day.toString()}
         overlap="circular"
         badgeContent={
            hasItems && (
               <WatchLaterSharpIcon
                  sx={{
                     fontSize: "3vw"
                  }}
               />
            )
         }
         showZero={false}
         sx={{
            height: "13.5vw",
            minHeight: 44,
            width: "13.5vw",
            minWidth: 44,
            '& .MuiPickersDay-root': {
               fontSize: "4vw",
               height: '11vw',
               width: '11vw'
            }
         }}
      >
         <PickersDay
            {...other}
            day={day}
            onClick={() => onClick(day)}
         />
      </Badge>
   )
}

function Calendar({
   handleDaySelect,
   items,
   selectedDay
}) {
   const [itemDays, setItemDays] = useState(false)

   useEffect(() => {
      if (items) {
         const daysWithItems = items.map(
            (item) => {
               const date = new Date(item.date)
               const month = date.getMonth() + 1
               const day = date.getUTCDate()
               const year = date.getFullYear()
               return `${month}-${day}-${year}`
            }
         )
         setItemDays(daysWithItems)
      }
   }, [items, selectedDay])

   return (
      <LocalizationProvider
         dateAdapter={AdapterDayjs}
      >
         <DateCalendar
            showDaysOutsideCurrentMonth
            renderLoading={() => (
               <DayCalendarSkeleton />
            )}
            slots={{
               day: (props) => (
                  <ServerDay
                     {...props}
                     onClick={handleDaySelect}
                     itemDays={itemDays}
                  />
               )
            }}
            sx={{
               border: 1,
               marginTop: 10,
               marginBottom: 3,
               maxHeight: {
                  xs: "100vh"
               },
               width: "100%",
               // Header row
               "& .MuiPickersCalendarHeader-root":
                  {
                     paddingLeft: "6vw"
                  },
               // Month/Year text
               "& .MuiPickersCalendarHeader-label":
                  {
                     fontWeight: "bold",
                     fontSize: "6.5vw"
                  },
               // Weekday header row
               "& .MuiDayCalendar-weekDayLabel": {
                  height: "13.5vw",
                  minHeight: 44,
                  width: "13.5vw",
                  minWidth: 44,
                  fontSize: "4vw",
                  margin: 0
               }
            }}
         />
      </LocalizationProvider>
   )
}

export default Calendar
