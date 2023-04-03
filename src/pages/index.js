import Landing from './landing';
import About from './about';
import Accounts from './accounts';
import { useRouter } from 'next/router';
import axios from 'axios';

const Index = ({ data }) => {
   const router = useRouter();
   const currentPath = router.pathname;

   return (
         <main>
            {currentPath === '/' && <Landing userData={data}/>}
            {currentPath === '/about' && <About />}
            {currentPath === '/accounts' && <Accounts />}
         </main>
   )
};

Index.getInitialProps = async (ctx) => {
   return {
      data: {
         expenses: {
            name: 'Home Repairs',
            amount: 1000.00
         },
         income: {
            name: 'Rideshare Income',
            amount: 200.00
         }
      }
   }
}

export default Index;