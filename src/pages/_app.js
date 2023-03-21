import { useEffect, useState } from 'react';
import '@/styles/globals.scss';
import '../frontend/components/Calendar/Calendar.scss';
import '../frontend/components/NavBar/NavBar.scss';

export default function App({ Component, pageProps }) {
   const [ render, setRender ] = useState(false);
   useEffect(() => setRender(true), []);
   if (typeof window === 'undefined') return null;
  return render ? <Component {...pageProps} /> : null;
}
