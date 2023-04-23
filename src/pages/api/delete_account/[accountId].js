import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const { 
    accountId
   } = req.query;
   console.log(accountId)

   const account = 
      await prisma.ledgerAccount.delete({
         where: {
            id: accountId
         }
      });

      res.json({
         success: `${account.name} has been deleted`
      });
      console.log(`${account.name} has been deleted`)
}