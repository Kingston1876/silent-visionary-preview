const prisma = require("../lib/prisma");

function save({ name, email, org, interest, message }) {
  return prisma.contactSubmission.create({
    data: { name, email, org: org || null, interest: interest || null, message },
  });
}

module.exports = { save };
