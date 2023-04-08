import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   const accounts = await prisma.ledgerAccount.findMany();
   res.json(accounts);
}