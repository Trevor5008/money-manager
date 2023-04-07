import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Landing from "../../../pages/landing";
import Button from "@mui/material/Button";

export default function LoginButton({ session, status }) {
   const router = useRouter();
   if (status === "authenticated" && session) {
      router.push("landing");
   }
   return (
      <>
         <Button variant="outlined" onClick={() => signIn()}>
            Sign in
         </Button>
      </>
   );
}
