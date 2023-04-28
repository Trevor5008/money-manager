const daysOfWeek = {
   0: "Sunday",
   1: "Monday",
   2: "Tuesday",
   3: "Wednesday",
   4: "Thursday",
   5: "Friday",
   6: "Saturday"
}

export const parseCurrentDate = (day) => {
   if (
      !day ||
      day.toDateString() ===
         new Date().toDateString()
   )
      return "Today"
   const dayName = daysOfWeek[day.getUTCDay()]
   const dayOfMonth = day.getUTCDate()
   const lastDigit = dayOfMonth
      .toString()
      .slice(-1)
   let postFix = "th"

   if (
      lastDigit === "1" &&
      (dayOfMonth < 10 || dayOfMonth > 13)
   ) {
      postFix = "st"
   } else if (
      lastDigit === "2" &&
      (dayOfMonth < 10 || dayOfMonth > 13)
   ) {
      postFix = "nd"
   } else if (
      lastDigit === "3" &&
      (dayOfMonth < 10 || dayOfMonth > 13)
   ) {
      postFix = "rd"
   }
   return `${dayName} ${dayOfMonth}${postFix}`
}
