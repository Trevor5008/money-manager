import { useState } from "react";
import axios from "axios";

export async function getStaticProps(ctx) {
   const res = await axios.get("http://localhost:3000/api/get_users");

   return {
      props: { data: res.data },
   };
}

export default function About({ data }) {
   const [userData, setUserData] = useState(data || null);

   return (
      <section className="about">
         <h1>Users: </h1>
         {/* {userData.map(user => {
            return (
               <div>
                  <h2>{user.name}</h2>
                  <h4>{user.phone}</h4>
                  <p>
                     {user.name} prefers {user.preferences.theme} theme
                  </p>
               </div>
            );
         })} */}
      </section>
   );
}
