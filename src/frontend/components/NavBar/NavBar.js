import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function NavBar({ handleSwitch }) {
   return (
      <nav className="main-nav">
         <Link href="/">Home</Link>
         <Link href="/accounts">Accounts</Link>
         <Link href="/about">About</Link>
         <ThemeSwitch handleSwitch={handleSwitch}/>
      </nav>
   );
};