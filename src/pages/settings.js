import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Settings() {
   const router = useRouter();
   return (
      <>
         <h1>Settings</h1>
         <Button onClick={() => router.push("/")}>Back</Button>
      </>
   );
}
