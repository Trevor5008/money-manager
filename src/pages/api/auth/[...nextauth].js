import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials";
import MySqlAdapter from "@/database/adapter"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
   //  AppleProvider({
   //    clientId: process.env.APPLE_ID,
   //    clientSecret: process.env.APPLE_SECRET
   //  })
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
   //  EmailProvider({
   //    server: {
   //       host: process.env.EMAIL_SERVER_HOST,
   //       port: process.env.EMAIL_SERVER_PORT,
   //       auth: {
   //          user: process.env.EMAIL_SERVER_USER,
   //          pass: process.env.EMAIL_SERVER_PASSWORD
   //       }
   //    },
   //    from: process.env.EMAIL_FROM
   //  })
   CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        // Add logic here to look up the user from the credentials supplied
        const user = { 
            id: "1", 
            name: "john", 
            email: "jsmith@example.com", 
            password: '12345'
         }
  
        if (user.name === username && user.password === password) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
//   adapter: MySqlAdapter()
}

export default NextAuth(authOptions);