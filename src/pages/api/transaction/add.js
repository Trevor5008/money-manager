import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const {
      name,
      amount,
      onDate,
      iterations,
      endDate,
      specificDay,
      accountId,
      transactionTypeId,
      recurrenceId,
      recurrence,
      description,
      isSettled,
   } = req.body;

   const parsedEndDate = endDate ? new Date(endDate) : null;
   const typeData = await prisma.transactionType.findFirst({
      where: { id: transactionTypeId },
      select: { type: true },
   });

   const transactionName = name || typeData.type;

   const newTransaction = await prisma.transaction.create({
      data: {
         name: transactionName,
         iterations,
         end_date: parsedEndDate,
         ledgerAccountId: accountId,
         transactionTypeId,
         recurrencePeriodId: recurrenceId,
         notes: description,
      },
   });

   // // Create transaction occurrences based on the transaction data
   let occurrenceDate = new Date(onDate);
   const occurrenceNotes = description || "";

   for (let i = 1; i <= iterations; i++) {
      // Update occurrenceDate to the next occurrence date 
      // based on recurrence period
      if (recurrence === "Daily") {
         occurrenceDate.setDate(occurrenceDate.getDate() + 1);
      } else if (recurrence === "Weekly") {
         occurrenceDate.setDate(occurrenceDate.getDate() + 7);
      } else if (recurrence === "Monthly") {
         occurrenceDate = new Date(occurrenceDate.getFullYear(),
            occurrenceDate.getMonth() + 1, specificDay);
         console.log(occurrenceDate)
         
      } else if (recurrence === "Quarterly") {
         occurrenceDate.setMonth(occurrenceDate.getMonth() + 3);
      } else if (recurrence === "Yearly") {
         occurrenceDate.setFullYear(occurrenceDate.getFullYear() + 1);
      }

      await prisma.transactionOccurrence.create({
         data: {
            date: occurrenceDate,
            amount,
            notes: occurrenceNotes,
            isSettled,
            transaction: {
               connect: {
                  id: newTransaction.id,
               },
            },
         },
      });
   }

   res.json({
      success: `${newTransaction.name} has been created with ${iterations} occurrences`,
   });
   console.log(
      `${newTransaction.name} has been created with ${iterations} occurrences`
   );
}
