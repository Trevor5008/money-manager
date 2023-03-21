import Link from 'next/link';

export default function NavBar() {
   return (
      <nav className="main-nav">
         <Link href="/">Home</Link>
         <Link href="/accounts">Accounts</Link>
         <Link href="/about">About</Link>
      </nav>
   );
};