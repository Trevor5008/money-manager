import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const { 
      accountTypeId, 
      userId,
      description 
   } = req.body;

   const newAccount = 
      await prisma.ledgerAccount.create({
         data: {
            accountTypeId,
            userId,
            name: req.body.accountName,
            startingBalance: req.body.startBalance,
            openedDate: new Date(),
            description
         }
      });

      res.json({
         success: `${newAccount} has been created`
      });
      console.log(`${newAccount} has been created`)
}
