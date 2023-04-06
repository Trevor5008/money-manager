import { useSession, signIn } from "next-auth/react";
import Landing from "../../../pages/landing";
import Button from "@mui/material/Button";

export default function LoginButton() {
   const { data: session, status } = useSession();

   if (status === "authenticated" && session) {
      return (
         <>
            <Landing userData={session} />
         </>
      );
   }
   return (
      <>
         <Button variant="outlined" onClick={() => signIn()}>
            Sign in
         </Button>
      </>
   );
}
