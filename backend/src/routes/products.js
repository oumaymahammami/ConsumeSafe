import express from "express";
import { z } from "zod";
import { initDb, db } from "../db/init.js";

const router = express.Router();

const ProductSchema = z.object({
  name: z.string().min(2).max(120),
  brand: z.string().max(120).optional().default(""),
  category: z.string().max(120).optional().default(""),
  country: z.string().max(120).optional().default(""),
  isBoycotted: z.union([z.boolean(), z.number()]).optional().default(false),
  reason: z.string().max(500).optional().default(""),
  tunisianAlternative: z.string().max(200).optional().default("")
});

router.get("/", async (req, res, next) => {
  try {
    await initDb();
    const rows = await db.all("SELECT * FROM products ORDER BY createdAt DESC;");
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    await initDb();
    const q = (req.query.q || "").toString().trim();
    if (!q) return res.json([]);
    const rows = await db.all(
      `SELECT * FROM products
       WHERE lower(name) LIKE ? OR lower(brand) LIKE ?
       ORDER BY isBoycotted DESC, name ASC;`,
      [`%${q.toLowerCase()}%`, `%${q.toLowerCase()}%`]
    );
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await initDb();
    const parsed = ProductSchema.safeParse(req.body || {});
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", issues: parsed.error.issues });
    }

    const p = parsed.data;
    const createdAt = new Date().toISOString();

    const result = await db.run(
      `INSERT INTO products (name, brand, category, country, isBoycotted, reason, tunisianAlternative, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.name, p.brand, p.category, p.country, p.isBoycotted ? 1 : 0, p.reason, p.tunisianAlternative, createdAt]
    );

    const row = await db.get("SELECT * FROM products WHERE id = ?", [result.lastID]);
    res.status(201).json(row);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/toggle", async (req, res, next) => {
  try {
    await initDb();
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const row = await db.get("SELECT * FROM products WHERE id = ?", [id]);
    if (!row) return res.status(404).json({ error: "not found" });

    const newVal = row.isBoycotted ? 0 : 1;
    await db.run("UPDATE products SET isBoycotted = ? WHERE id = ?", [newVal, id]);
    const updated = await db.get("SELECT * FROM products WHERE id = ?", [id]);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
