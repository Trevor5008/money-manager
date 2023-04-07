import { useSession } from "next-auth/react";
import Login from "./login";
import Landing from "./landing";
import About from "./about";
import Accounts from "./accounts";
import { useRouter } from "next/router";

const Index = () => {
   const { data: session, status } = useSession();

   const router = useRouter();
   const currentPath = router.pathname;

   return (
      <main>
         {currentPath === "/" && <Login session={session} status={status} />}
         {currentPath === "/landing" && <Landing />}
         {currentPath === "/about" && <About />}
         {currentPath === "/accounts" && <Accounts session={session} />}
      </main>
   );
};

export default Index;
