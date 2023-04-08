const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
   const pass1 = await hash("test1", 12);
   const pass2 = await hash("test2", 12);
   const users = await prisma.user.createMany({
      data: [
         {
            username: "John",
            name: "John Doe",
            email: "johndoe@icloud.com",
            password: pass1,
         },
         {
            username: "Jane",
            name: "Jane Doe",
            email: "janedoe@icloud.com",
            password: pass2,
         },
      ],
   });
   console.log(`Created users: ${users.count}`);
   const recurrencePeriods = await prisma.recurrencePeriod.createMany({
      data: [
         {
            type: 'Daily'
         },
         {
            type: 'Weekly'
         },
         {
            type: 'Monthly'
         },
         {
            type: 'Specific Day'
         },
         {
            type: 'Quarterly'
         },
         {
            type: 'Yearly'
         }
      ]
   });
   console.log(`Created recurrencePeriods: ${recurrencePeriods.count}`)
   const accountTypes = await prisma.accountType.createMany({
      data: [
         {
            type: "Cash",
            icon: "cash.svg",
         },
         {
            type: "Credit Card",
            icon: "credit-card.svg",
         },
         {
            type: "Investment",
            icon: "investment.svg",
         },
         {
            type: "Long Term Investment",
            icon: "long-term-investment.svg",
         },
         {
            type: "Savings",
            icon: "small-saving.svg",
         },
         {
            type: "Personal Loan",
            icon: "wallet.svg",
         },
            {
               type: "Vehicle Loan",
               icon: "wallet.svg"
            }
      ],
   });
   console.log(`Created ${accountTypes.count} account types`);
   const transactionTypes = await prisma.transactionType.createMany({
      data: [
         {
            type: "Rent",
            icon: "cash.svg",
         },
         {
            type: "Charity",
            icon: "charity.svg",
         },
         {
            type: "Credit Card Payment",
            icon: "credit-card.svg",
         },
         {
            type: "Investment",
            icon: "investment.svg",
         },
         {
            type: "Long Term Investment",
            icon: "long-term-investment.svg",
         },
         {
            type: "Savings",
            icon: "small-saving.svg",
         },
         {
            type: "Transfer",
            icon: "transfer.svg",
         },
         {
            type: "Car Payment",
            icon: "wallet.svg",
         },
         {
            type: "Fuel",
            icon: "wallet.svg",
         },
         {
            type: "Maintenance",
            icon: "wallet.svg"
         },
         {
            type: "Food/Drinks",
            icon: "wallet.svg"
         },
         {
            type: "Education",
            icon: "wallet.svg"
         },
         {
            type: "Taxes",
            icon: "wallet.svg"
         },
         {
            type: "Salary",
            icon: "wallet.svg"
         },
         {
            type: "Rideshare Income",
            icon: "wallet.svg"
         },
         {
            type: "Freelance",
            icon: "wallet.svg"
         },
         {
            type: "Repairs",
            icon: "wallet.svg"
         },
         {
            type: "Mortgage",
            icon: "wallet.svg"
         },
         {
            type: "Loan Payment",
            icon: "wallet.svg"
         },
         {
            type: "Interest Income",
            icon: "wallet.svg"
         },
         {
            type: "Dividend",
            icon: "wallet.svg"
         },
      ],
   });
   console.log(`Created ${transactionTypes.count} transaction types`);
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
