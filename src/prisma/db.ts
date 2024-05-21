import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

export type Context = {
  prisma: PrismaClient;
};

export function createContext(): Context {
  return { prisma };
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
