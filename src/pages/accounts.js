import { useRouter } from "next/router";

export default function Accounts() {
   const router = useRouter();

   const handleClick = () => {
      router.push('/api/hello');
   }

   return (
      <section className="accounts">
         <h1>Accounts</h1>
         <button onClick={handleClick}>Click Me!</button>
      </section>
   );
};