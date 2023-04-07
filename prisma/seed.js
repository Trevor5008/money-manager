const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
   // const pass1 = await hash("test1", 12);
   // const pass2 = await hash("test2", 12);
   // const users = await prisma.user.createMany({
   //    data: [
   //       {
   //          username: "John",
   //          name: "John Doe",
   //          email: "johndoe@icloud.com",
   //          password: pass1,
   //       },
   //       {
   //          username: "Jane",
   //          name: "Jane Doe",
   //          email: "janedoe@icloud.com",
   //          password: pass2,
   //       },
   //    ],
   // });
   // console.log(`Created users: ${users.count}`);
   // const accountTypes = await prisma.accountType.createMany({
   //    data: [
   //       {
   //          type: "Cash",
   //          icon: "cash.svg",
   //       },
   //       {
   //          type: "Charity",
   //          icon: "charity.svg",
   //       },
   //       {
   //          type: "Credit Card",
   //          icon: "credit-card.svg",
   //       },
   //       {
   //          type: "Investment",
   //          icon: "investment.svg",
   //       },
   //       {
   //          type: "Long Term Investment",
   //          icon: "long-term-investment.svg",
   //       },
   //       {
   //          type: "Small Savings",
   //          icon: "small-saving.svg",
   //       },
   //       {
   //          type: "Transfer",
   //          icon: "transfer.svg",
   //       },
   //       {
   //          type: "Wallet",
   //          icon: "wallet.svg",
   //       },
   //    ],
   // });
   // console.log(`Created ${accountTypes.count} account types`);
   const transactionTypes = await prisma.transactionType.createMany({
      data: [
         {
            type: "Cash",
            icon: "cash.svg",
         },
         {
            type: "Charity",
            icon: "charity.svg",
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
            type: "Small Savings",
            icon: "small-saving.svg",
         },
         {
            type: "Transfer",
            icon: "transfer.svg",
         },
         {
            type: "Wallet",
            icon: "wallet.svg",
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
