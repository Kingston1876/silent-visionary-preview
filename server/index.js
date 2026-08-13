require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const casesRoutes = require("./routes/cases");
const contactRoutes = require("./routes/contact");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

var ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN || "http://localhost:8735")
  .split(",")
  .map(function (o) { return o.trim(); })
  .concat(["http://localhost:8735", "http://127.0.0.1:8735"]);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/cases", casesRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Silent Visionary API listening on :${PORT}`);
});
