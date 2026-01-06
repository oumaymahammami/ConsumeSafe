# 🇹🇳 ConsumeSafe - مستهلك آمن

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

**ConsumeSafe** is a full-stack web application designed to help Tunisian consumers make informed purchasing decisions by providing information about product boycotts and suggesting local alternatives.

> **استهلك بوعي • Consommez consciemment • Consume Consciously**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

ConsumeSafe empowers Tunisian consumers to:
- ✅ Check if products are subject to boycotts
- 🔍 Search through a database of **272 products**
- 🇹🇳 Discover local Tunisian alternatives
- 🌍 Support ethical consumption and local economy

The application features a **trilingual interface** (Arabic, French, English) with a distinctive **Tunisian-themed design** using the national colors and Cairo typography for optimal Arabic readability.

---

## ✨ Features

### 🔎 Smart Product Search
- Real-time search across 272 products
- Instant results with live status indicator
- Case-insensitive search in Arabic, French, and English

### 📊 Product Information
- **Boycott Status**: Clear visual indicators (⚠️ Boycotted / ✅ Safe)
- **Product Details**: Name, brand, category, and reason for boycott
- **Alternatives**: Tunisian product recommendations
- **Visual Design**: Color-coded cards (red for boycotted, green for safe)

### 🎨 Tunisian-Themed UI
- Dark gradient background (#1a1a1a to #2d1a1a)
- Red accent colors (#E31837) representing the Tunisian flag
- Geometric patterns inspired by traditional Tunisian architecture
- Cairo font for elegant Arabic typography

### 🌐 Multilingual Support
- Arabic (العربية) - Primary language
- French (Français) - Secondary language
- English - International accessibility

### ➕ Admin Features
- Add new products to the database
- Modal-based product entry form
- Instant database updates

---

## 🏗️ Architecture

```
┌─────────────────┐
│                 │
│   Frontend      │
│   (React+Vite)  │
│   Port: 5174    │
│                 │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│                 │
│   Backend       │
│   (Express.js)  │
│   Port: 5050    │
│                 │
└────────┬────────┘
         │
         │ SQL Queries
         │
┌────────▼────────┐
│                 │
│   Database      │
│   (SQLite)      │
│   272 Products  │
│                 │
└─────────────────┘
```

**Data Flow:**
1. User searches for a product in the frontend
2. React sends GET request to `http://localhost:5050/api/products?search=query`
3. Express backend queries SQLite database
4. Results returned as JSON array
5. Frontend displays color-coded product cards

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library with hooks
- **Vite 5.0.8** - Fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Axios 1.6.5** - HTTP client for API calls
- **Google Fonts (Cairo)** - Arabic-friendly typography

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **SQLite (better-sqlite3 9.2.2)** - Embedded database
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.0.2** - Development auto-reload

### Development Tools
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Git** - Version control

---

## 📁 Project Structure

```
ConsumeSafe/
│
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server setup
│   │   ├── db/
│   │   │   ├── init.js            # Database initialization
│   │   │   └── seed.js            # Seed 272 products
│   │   └── routes/
│   │       └── products.js        # API routes
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # Entry point
│   │   ├── App.jsx                # Main component
│   │   ├── index.css              # Global styles
│   │   └── components/
│   │       ├── Header.jsx         # App header
│   │       ├── SearchBar.jsx      # Search input
│   │       ├── ProductCard.jsx    # Product display
│   │       └── AddProductModal.jsx # Add product form
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── consumesafe_large_seed.json    # 272 product database
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** version 18 or higher
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

### Step 1: Clone the Repository
```bash
git clone https://github.com/oumaymahammami/ConsumeSafe.git
cd ConsumeSafe
```

### Step 2: Backend Setup
```bash
cd backend
npm install
npm run seed    # Load 272 products into database
npm run dev     # Start server on http://localhost:5050
```

**Backend Dependencies Installed:**
- express
- better-sqlite3
- cors
- nodemon (dev)

### Step 3: Frontend Setup
Open a **new terminal window** and run:
```bash
cd frontend
npm install
npm run dev     # Start dev server on http://localhost:5174
```

**Frontend Dependencies Installed:**
- react
- react-dom
- axios
- tailwindcss
- vite

### Step 4: Access the Application
Open your browser and navigate to:
```
http://localhost:5174
```

---

## 💻 Usage

### Searching for Products
1. **Type in the search bar**: Enter product name, brand, or category
2. **View results**: Products appear instantly with boycott status
3. **Read details**: Each card shows:
   - Product name in Arabic and French
   - Brand name
   - Boycott status (⚠️ مقاطع or ✅ آمن)
   - Reason for boycott (if applicable)
   - Tunisian alternative suggestions

### Example Searches
- **"Coca Cola"** → Shows boycott status + alternative "Boga Cola"
- **"Danone"** → Shows boycotted products + Tunisian dairy alternatives
- **"Nestlé"** → Lists affected products + local substitutes

### Adding Products (Admin)
1. Click **"+ إضافة منتج"** button in header
2. Fill in the form:
   - Product name (English)
   - Product name (Arabic)
   - Brand
   - Category
   - Boycott status
   - Reason (optional)
   - Alternative (optional)
3. Click **"حفظ"** to save

---

## 🗄️ Database

### Schema
The SQLite database contains a single table: `products`

```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_ar TEXT,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  is_boycotted INTEGER NOT NULL DEFAULT 0,
  reason TEXT,
  alternative TEXT
);
```

### Database Location
```
backend/consumesafe.sqlite
```

### Seeding Data
The database is seeded from `consumesafe_large_seed.json` containing **272 products** across categories:
- 🥤 Beverages
- 🧀 Dairy Products
- 🍫 Snacks & Sweets
- 🧼 Personal Care
- 🏠 Household Products
- 🍝 Food Products
- ☕ Coffee & Tea

To re-seed the database:
```bash
cd backend
npm run seed
```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:5050/api
```

### GET `/products`
Retrieve all products or search by query.

**Query Parameters:**
- `search` (optional) - Search term for filtering products

**Request Example:**
```bash
curl "http://localhost:5050/api/products?search=cola"
```

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Coca-Cola",
    "name_ar": "كوكا كولا",
    "brand": "The Coca-Cola Company",
    "category": "Beverages",
    "is_boycotted": 1,
    "reason": "Supports Israeli economy",
    "alternative": "Boga Cola (Tunisia)"
  }
]
```

### POST `/products`
Add a new product to the database.

**Request Body:**
```json
{
  "name": "Product Name",
  "name_ar": "اسم المنتج",
  "brand": "Brand Name",
  "category": "Category",
  "is_boycotted": 1,
  "reason": "Reason for boycott",
  "alternative": "Local alternative"
}
```

**Response:**
```json
{
  "id": 273,
  "name": "Product Name",
  ...
}
```

---

## 🎨 Design Philosophy

### Color Palette
- **Primary Background**: `#1a1a1a` → `#2d1a1a` (gradient)
- **Accent Red**: `#E31837` (Tunisian flag red)
- **Boycotted Products**: Red borders and gradients
- **Safe Products**: Emerald green accents
- **Text**: White with various opacity levels

### Typography
- **Font Family**: Cairo (Google Fonts)
- **Weights**: 400 (regular), 700 (bold)
- **Supports**: Arabic, French, English

### Visual Elements
- Geometric patterns inspired by Tunisian tiles
- Animated pulse indicators for live search
- Smooth hover transitions
- Responsive grid layout
- Glass-morphism effects on cards

---

## 🤝 Contributing

We welcome contributions to ConsumeSafe! Here's how you can help:

### Reporting Issues
- Check if the issue already exists
- Provide detailed description
- Include steps to reproduce
- Add screenshots if applicable

### Suggesting Features
- Explain the feature clearly
- Describe use cases
- Consider impact on existing functionality

### Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m "Add feature description"`
6. Push: `git push origin feature-name`
7. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write clear commit messages
- Update documentation
- Test on multiple browsers
- Ensure responsive design works

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 ConsumeSafe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

- **GitHub**: [github.com/oumaymahammami/ConsumeSafe](https://github.com/oumaymahammami/ConsumeSafe)
- **Issues**: Report bugs or request features via GitHub Issues

---

## 🙏 Acknowledgments

- Tunisian community for local product information
- Open-source contributors
- All users supporting ethical consumption

---

<div align="center">

**Made with ❤️ in Tunisia 🇹🇳**

*استهلك بوعي • Consommez consciemment • Consume Consciously*

</div>
