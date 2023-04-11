import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const accountTypes = await prisma.accountType.findMany();
   res.json(accountTypes);
}