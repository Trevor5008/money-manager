import LoginButton from "@/frontend/components/LoginButton/LoginButton";
import { Container, Link, Typography } from "@mui/material";

export default function Login({ session, status }) {
   return (
      <section className="login">
         <div className="login__window">
            <Typography 
               variant="h3"
               className="login__welcome"
            >
               Welcome Manager
            </Typography>
            <Container className="login__footer">
               <LoginButton session={session} status={status} />
               <Typography variant="p">
                  Not yet a member? &nbsp;
                  <Link href="https://www.google.com">Sign Up</Link>
               </Typography>
            </Container>
         </div>
      </section>
   );
}
