import Week from './Week';
import dayjs from 'dayjs';

export default function Calendar() {
   const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");
   let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH, 1));
   console.log(selectedMonth)
   return (
      <table bgcolor="lightgrey" align="center">
      <thead>
          <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
          </tr>
      </thead>
        
      <tbody>
         {[1,2,3,4,5,6].map(week => {
            return <Week week={week} />;
         })}
      </tbody>
  </table>
   );
}