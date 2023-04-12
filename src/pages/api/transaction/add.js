import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const {
      name,
      category,
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

   const typeData = await prisma.transactionType.findFirst({
      where: { id: transactionTypeId },
      select: { type: true },
   });

   const transactionName = name || typeData.type;

   const newTransaction = await prisma.transaction.create({
      data: {
         name: transactionName,
         iterations,
         end_date: endDate,
         ledgerAccountId: accountId,
         transactionTypeId,
         recurrencePeriodId: recurrenceId,
         notes: description,
      },
   });

   // // Create transaction occurrences based on the transaction data
   let occurrenceDate = new Date(onDate);
   const occurrenceNotes = description || "";
   let transactionAmount = category === "expense" ? -amount : amount;

   if (iterations > 1) {
      await prisma.transactionOccurrence.create({
         data: {
            date: occurrenceDate,
            amount: transactionAmount,
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

   for (let i = 1; i <= iterations; i++) {
      // Update occurrenceDate to the next occurrence date
      // based on recurrence period
      if (recurrence === "Daily") {
         occurrenceDate.setDate(occurrenceDate.getDate() + 1);
      } else if (recurrence === "Weekly") {
         occurrenceDate.setDate(occurrenceDate.getDate() + 7);
      } else if (recurrence === "Monthly") {
         occurrenceDate = new Date(
            occurrenceDate.getFullYear(),
            occurrenceDate.getMonth() + 1,
            specificDay
         );
      } else if (recurrence === "Quarterly") {
         occurrenceDate.setMonth(occurrenceDate.getMonth() + 4);
      } else if (recurrence === "Yearly") {
         occurrenceDate.setFullYear(occurrenceDate.getFullYear() + 1);
      }

      await prisma.transactionOccurrence.create({
         data: {
            date: occurrenceDate,
            amount: transactionAmount,
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
