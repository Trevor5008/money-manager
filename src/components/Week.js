import styles from '../styles/Calendar.module.scss';

export default function Week({ week }) {
   return (
      <tr>
         {[1,2,3,4,5,6,7].map(day => {
            return <td className={styles.td}>{day}</td>;
         })}
      </tr>
   );
}