import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const user = await prisma.user.findFirst({
      where: {
         id: req.query.id,
      },

      include: {
         ledgerAccounts: {

            include: {
               accountType: {
                  select: {
                     icon: true
                  }
               },
               transactions: {

                  include: {
                     transactionOccurrences: true
                  }
               }
            }
         }
      }
   });
   res.json(user);
}