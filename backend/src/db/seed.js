import { initDb, db } from "./init.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the seed data from the JSON file
const seedPath = join(__dirname, "../../../../../consumesafe_large_seed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf-8"));

await initDb();

await db.exec("DELETE FROM products;");

console.log(`📦 Loading ${seed.length} products into database...`);

for (const p of seed) {
  await db.run(
    `INSERT INTO products (name, brand, category, country, isBoycotted, reason, tunisianAlternative, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.name, p.brand, p.category, p.country, p.isBoycotted, p.reason, p.tunisianAlternative, p.createdAt]
  );
}

console.log("✅ Seed complete. المنتجات تم إدخالها بنجاح.");
console.log(`✅ ${seed.length} products added to database.`);
process.exit(0);
