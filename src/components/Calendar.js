import { useState } from 'react';
import dayjs from 'dayjs';

function Calendar({ year, month, today }) {
   const [ currentYear, setCurrentYear ] = useState(year);
   const [ currentMonth, setCurrentMonth ] = useState(month);
   const days = getDaysInMonth(currentYear, currentMonth);

   function getDaysInMonth(year, month) {
      const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
      const startDay = dayjs(`${year}-${month}-01`).day();
      const days = [];

      for (let i = 1; i <= daysInMonth; i++) {
         days.push({
            day: i,
            date: dayjs(`${year}-${month}-${i}`),
         });
      }

      for (let i = 0; i < startDay; i++) {
         days.unshift(null);
      }

      return days;
   }

   const weeks = [];
   let week = [];
   days.forEach((day) => {
      week.push(day);
      if (week.length === 7) {
         weeks.push(week);
         week = [];
      }
   });
   if (week.length > 0) {
      weeks.push(week);
   }

   const priorMonth = () => {
      if (currentMonth === 0) {
         setCurrentMonth(11);
         setCurrentYear(currentYear - 1);
      } else {
         setCurrentMonth(currentMonth - 1);
      }
   }

   const nextMonth = () => {
      if (currentMonth === 11) {
         setCurrentYear(currentYear + 1);
         setCurrentMonth(0);
      } else {
         setCurrentMonth(currentMonth + 1);
      }
   }

   return (
      <section className='calendar'>
         <div className="calendar__header">
               <p 
                  className='calendar__month-prior'
                  onClick={priorMonth}>{"< "}&nbsp;&nbsp;</p>
            <h2 className="calendar__current-month">
               {dayjs(`${currentYear}-${currentMonth}-01`).format('MMMM YYYY')}
            </h2>
               <p 
                  className='calendar__month-next'
                  onClick={nextMonth}>&nbsp;&nbsp;{" >"}</p>
         </div>
         <table className="calendar__body">
            <thead>
               <tr className="calendar__header-days">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                     <td key={day} className='calendar__header-day'>{day}</td>
                  ))}
               </tr>
            </thead>
            <tbody>
               {weeks.map((week) => (
                  <tr key={week[0]?.date?.format('YYYY-MM-DD') || Math.random()} className="calendar__week">
                     {week.map((day) => {
                        const date = day && day.day;
                        return <td
                           key={day?.date?.format('YYYY-MM-DD') || Math.random()}
                           className=
                           {`calendar__day${date === today 
                              && currentYear === year
                              ?' calendar__day--today' : ''}`}
                        >
                           <small className='calendar__date'>{day?.day}</small>
                        </td>;
                     })}
                  </tr>
               ))}
            </tbody>
         </table>
      </section>
   );
}

export default Calendar;