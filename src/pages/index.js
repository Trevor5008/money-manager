import Login from './login';
import About from './about';
import Accounts from './accounts';
import { useRouter } from 'next/router';

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

export default Index;