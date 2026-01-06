import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import { initDb } from "./db/init.js";

const app = express();
app.use(cors());
app.use(express.json());

await initDb();

app.get("/", (req, res) => {
  res.json({ ok: true, name: "ConsumeSafe API" });
});

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
