import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const transactionTypes = await prisma.transactionType.findMany();
   res.json(transactionTypes);
}