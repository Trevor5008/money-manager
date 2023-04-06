import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Profile() {
   const router = useRouter();
   return (
      <>
         <h1>Profile</h1>
         <Button onClick={() => router.push("/")}>Back</Button>
      </>
   );
}
