const express = require("express");
const contactStore = require("../services/contactStore");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  const { name, email, org, interest, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const submission = await contactStore.save({ name, email, org, interest, message });
  res.status(201).json({ ok: true, id: submission.id, message: "Thanks — we'll be in touch." });
});

module.exports = router;
