const express = require("express");
const jwt = require("jsonwebtoken");
const userStore = require("../services/userStore");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  path: "/",
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await userStore.findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const valid = await userStore.verifyPassword(user, password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.cookie("sv_token", token, { ...COOKIE_OPTIONS, maxAge: 8 * 60 * 60 * 1000 });
  res.json({ user: userStore.toPublicUser(user) });
});

router.post("/logout", (req, res) => {
  res.clearCookie("sv_token", COOKIE_OPTIONS);
  res.status(204).end();
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await userStore.findByEmail(req.user.email);
  if (!user) return res.status(401).json({ error: "Not authenticated." });
  res.json({ user: userStore.toPublicUser(user) });
});

module.exports = router;
