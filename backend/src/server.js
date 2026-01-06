import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import { initDb } from "./db/init.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "200kb" }));

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: corsOrigin }));

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const max = Number(process.env.RATE_LIMIT_MAX || 100);
app.use(rateLimit({ windowMs, max }));

await initDb();

app.get("/", (req, res) => {
  res.json({ ok: true, name: "ConsumeSafe API" });
});

app.use("/api/products", productsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" ? { details: err.message } : {})
  });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
