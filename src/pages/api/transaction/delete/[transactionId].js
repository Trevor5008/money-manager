import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const { 
    transactionId
   } = req.query;

   const transaction = 
      await prisma.transaction.delete({
         where: {
            id: transactionId
         }
      });

      res.json({
         success: `${transaction.name} has been deleted`
      });
      console.log(`${transaction.name} has been deleted`)
}