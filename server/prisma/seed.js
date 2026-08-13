const path = require("path");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const DEMO_PASSWORD = "Demo!2026";
const DEMO_USERS = [
  { email: "investigator@agency.gov", name: "A. Rivera", role: "Investigator" },
  { email: "analyst@agency.gov", name: "J. Chen", role: "Forensic Analyst" },
  { email: "soc@agency.gov", name: "M. Osei", role: "SOC Analyst" },
  { email: "admin@agency.gov", name: "D. Alvarez", role: "Administrator" },
];

async function seedUsers() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  for (const u of DEMO_USERS) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, passwordHash },
      create: { ...u, passwordHash },
    });
  }
  console.log(`Seeded ${DEMO_USERS.length} demo users (password: ${DEMO_PASSWORD})`);
}

async function seedCases() {
  const cases = require(path.join(__dirname, "cases.source.js"));
  const entries = Object.entries(cases);
  for (const [id, data] of entries) {
    await prisma.case.upsert({
      where: { id },
      update: { title: data.title, severity: data.severity, status: data.status, dataJson: JSON.stringify(data) },
      create: { id, title: data.title, severity: data.severity, status: data.status, dataJson: JSON.stringify(data) },
    });
  }
  console.log(`Seeded ${entries.length} cases`);
}

async function main() {
  await seedUsers();
  await seedCases();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
