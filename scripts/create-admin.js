/**
 * ساخت یا به‌روزرسانی حساب ادمین.
 * استفاده: node scripts/create-admin.js <email> <name> <password>
 * آدرس دیتابیس از متغیر محیطی DATABASE_URL خوانده می‌شود.
 */
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const [, , email, name, password] = process.argv;
if (!email || !name || !password) {
  console.error("usage: node scripts/create-admin.js <email> <name> <password>");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

(async () => {
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hash, role: "ADMIN", name },
    create: { email, name, password: hash, role: "ADMIN" },
  });
  console.log("admin ready:", user.email, "| role:", user.role, "| name:", user.name);
})()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
