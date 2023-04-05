import Login from './login';
import Landing from './landing';
import About from './about';
import Accounts from './accounts/[userId]';
import { useRouter } from 'next/router';
import axios from 'axios';

const Index = () => {
   const router = useRouter();
   const currentPath = router.pathname;

   return (
         <main>
            {currentPath === '/' && <Login />}
            {currentPath === '/about' && <About />}
            {currentPath === '/accounts' && <Accounts />}
         </main>
   )
};

// Index.getInitialProps = async (ctx) => {
//    return {
//       data: {
//          expenses: {
//             name: 'Home Repairs',
//             amount: 1000.00
//          },
//          income: {
//             name: 'Rideshare Income',
//             amount: 200.00
//          }
//       }
//    }
// }

export default Index;