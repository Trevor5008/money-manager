const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt'); 
const prisma = new PrismaClient();

async function main() {
   const pass1 = await hash('test1', 12)
   const pass2 = await hash('test2', 12)
   const users = await prisma.user.createMany({
      data: [
         {
            username: 'John',
            name: 'John Doe',
            email: 'johndoe@icloud.com',
            password: pass1
         },
         {
            username: 'Jane',
            name: 'Jane Doe',
            email: 'janedoe@icloud.com',
            password: pass2
         }
      ]
   });
   console.log(`Created users: ${users.count}`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })