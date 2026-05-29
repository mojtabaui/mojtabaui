// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrisma = any;

// Prisma will be available after `npx prisma generate`
// eslint-disable-next-line prefer-const
let _prisma: AnyPrisma = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const g = globalThis as { _prisma?: AnyPrisma };
  _prisma = g._prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") g._prisma = _prisma;
} catch {
  // @prisma/client not yet generated — run `npx prisma generate`
}

export const prisma: AnyPrisma = _prisma;
export default prisma;
