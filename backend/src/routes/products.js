import express from "express";
import { initDb, db } from "../db/init.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  await initDb();
  const rows = await db.all("SELECT * FROM products ORDER BY createdAt DESC;");
  res.json(rows);
});

// Search products by name/brand
router.get("/search", async (req, res) => {
  await initDb();
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);
  const rows = await db.all(
    `SELECT * FROM products
     WHERE lower(name) LIKE ? OR lower(brand) LIKE ?
     ORDER BY isBoycotted DESC, name ASC;`,
    [`%${q.toLowerCase()}%`, `%${q.toLowerCase()}%`]
  );
  res.json(rows);
});

// Add product (simple admin feature)
router.post("/", async (req, res) => {
  await initDb();
  const {
    name, brand = "", category = "", country = "",
    isBoycotted = 0, reason = "", tunisianAlternative = ""
  } = req.body || {};

  if (!name) return res.status(400).json({ error: "name is required" });

  const createdAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO products (name, brand, category, country, isBoycotted, reason, tunisianAlternative, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, brand, category, country, isBoycotted ? 1 : 0, reason, tunisianAlternative, createdAt]
  );

  const row = await db.get("SELECT * FROM products WHERE id = ?", [result.lastID]);
  res.status(201).json(row);
});

// Toggle boycott status
router.patch("/:id/toggle", async (req, res) => {
  await initDb();
  const id = req.params.id;
  const row = await db.get("SELECT * FROM products WHERE id = ?", [id]);
  if (!row) return res.status(404).json({ error: "not found" });

  const newVal = row.isBoycotted ? 0 : 1;
  await db.run("UPDATE products SET isBoycotted = ? WHERE id = ?", [newVal, id]);
  const updated = await db.get("SELECT * FROM products WHERE id = ?", [id]);
  res.json(updated);
});

export default router;
