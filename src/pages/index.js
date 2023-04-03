import Landing from './landing';
import About from './about';
import Accounts from './accounts';
import { useRouter } from 'next/router';

export default function Home() {
   const router = useRouter();
   const currentPath = router.pathname;

   return (
         <main>
            {currentPath === '/' && <Landing />}
            {currentPath === '/about' && <About />}
            {currentPath === '/accounts' && <Accounts />}
         </main>
   )
}