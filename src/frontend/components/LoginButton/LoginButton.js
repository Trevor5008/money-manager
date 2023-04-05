import { useSession, signIn, signOut } from "next-auth/react";
import Landing from '../../../pages/landing';

export default function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <>
        <Landing userData={session}/>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}