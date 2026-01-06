import sqlite3 from "sqlite3";
import { open } from "sqlite";

export let db;

export async function initDb() {
  if (db) return db;

  db = await open({
    filename: "./src/db/consumesafe.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT,
      country TEXT,
      isBoycotted INTEGER NOT NULL DEFAULT 0,
      reason TEXT,
      tunisianAlternative TEXT,
      createdAt TEXT NOT NULL
    );
  `);

  return db;
}
