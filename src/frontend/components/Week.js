
export default function Week({ week }) {
   return (
      <tr>
         {[1,2,3,4,5,6,7].map(day => {
            return <td className="week__day">{day}</td>;
         })}
      </tr>
   );
}