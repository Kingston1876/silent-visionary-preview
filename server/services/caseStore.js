const prisma = require("../lib/prisma");

function rowToCase(row) {
  const data = JSON.parse(row.dataJson);
  return { ...data, id: row.id, title: row.title, severity: row.severity, status: row.status };
}

async function getAll() {
  const rows = await prisma.case.findMany();
  const result = {};
  for (const row of rows) {
    result[row.id] = rowToCase(row);
  }
  return result;
}

async function getById(id) {
  const row = await prisma.case.findUnique({ where: { id } });
  if (!row) return null;
  return rowToCase(row);
}

module.exports = { getAll, getById };
