# ConsumeSafe ✅🇹🇳

A simple *full‑stack* application:
- **Frontend:** React + Vite + Tailwind (pretty UI)
- **Backend:** Node.js + Express
- **Database:** SQLite (local file)
- **Feature:** Search a product/brand → if boycotted, highlight and show Tunisian alternatives.

---

## 1) Requirements
Install:
- **Node.js (LTS)**: https://nodejs.org

---

## 2) Run the backend (API)
Open a terminal inside `backend`:

```bash
cd backend
npm install
npm run seed     # fills the DB with example data
npm run dev      # runs on http://localhost:5050
```

---

## 3) Run the frontend (UI)
Open a *second* terminal inside `frontend`:

```bash
cd frontend
npm install
npm run dev      # runs on http://localhost:5173
```

---

## 4) Use it
- Open: http://localhost:5173
- Type a product name like **Coca‑Cola**.
- If it’s on the boycott list → it becomes **red** + shows the Tunisian alternative.
- If not → it shows **Safe ✅**.

---

## 5) Add / edit your boycott list
Edit seed data here:
`backend/src/db/seed.js`

Then re-seed:
```bash
cd backend
npm run seed
```

---

## 6) Where is the database?
`backend/src/db/consumesafe.sqlite`

---

## 7) Production build (optional)
Frontend build:
```bash
cd frontend
npm run build
npm run preview
```

Backend start:
```bash
cd backend
npm start
```

---

Made with ❤️ for Tunisia.
