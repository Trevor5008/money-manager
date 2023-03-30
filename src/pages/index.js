import Dashboard from '../pages/Dashboard/Dashboard';
import About from '../pages/about';
import Accounts from './accounts';
import styles from '@/styles/Home.module.scss';
import { useRouter } from 'next/router';

export default function Home() {
   const router = useRouter();
   const currentPath = router.pathname;

   return (
         <main className={styles.main}>
            {currentPath === '/' && <Dashboard />}
            {currentPath === '/about' && <About />}
            {currentPath === '/accounts' && <Accounts />}
         </main>
   )
}
