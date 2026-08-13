const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

function verifyPassword(user, plainPassword) {
  return bcrypt.compare(plainPassword, user.passwordHash);
}

function toPublicUser(user) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

module.exports = { findByEmail, verifyPassword, toPublicUser };
