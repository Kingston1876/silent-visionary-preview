const express = require("express");
const caseStore = require("../services/caseStore");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const cases = await caseStore.getAll();
  res.json(cases);
});

router.get("/:id", requireAuth, async (req, res) => {
  const caseData = await caseStore.getById(req.params.id);
  if (!caseData) return res.status(404).json({ error: "Case not found." });
  res.json(caseData);
});

module.exports = router;
