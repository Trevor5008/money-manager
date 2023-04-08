import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const {
      name,
      amount,
      onDate,
      iterations,
      endDate,
      accountId,
      transactionTypeId,
      recurrenceId,
      description,
   } = req.body;

   const parsedEndDate = endDate 
      ? new Date(endDate) : null;

   const typeData = await prisma.transactionType.findFirst({
      where: { id: transactionTypeId },
      select: { type: true }
   });

   const transactionName = name || typeData.type;
   
   const newTransaction = await prisma.transaction.create({
      data: {
         name: transactionName,
         amount,
         date: new Date(onDate),
         iterations,
         end_date: parsedEndDate,
         ledgerAccountId: accountId,
         transactionTypeId,
         recurrencePeriodId: recurrenceId,
         notes: description,
      },
   });

   res.json({
      success: `${newTransaction} has been created`,
   });
   console.log(`${newTransaction} has been created`);
}
