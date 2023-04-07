import LoginButton from "@/frontend/components/LoginButton/LoginButton";

export default function Login({ session, status }) {
   return <LoginButton session={session} status={status} />;
}
