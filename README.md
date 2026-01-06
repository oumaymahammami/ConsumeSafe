# ConsumeSafe - مستهلك آمن

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![Security](https://img.shields.io/badge/security-helmet%20%7C%20rate--limit-blue)](https://github.com/helmetjs/helmet)
[![DevSecOps](https://img.shields.io/badge/DevSecOps-CI%2FCD%20%7C%20CodeQL-success)](https://github.com/features/security)

**ConsumeSafe** is a full-stack web application designed to help Tunisian consumers make informed purchasing decisions by providing information about product boycotts and suggesting local alternatives.

> **استهلك بوعي • Consommez consciemment • Consume Consciously**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [DevSecOps Implementation](#devsecops-implementation)
- [Getting Started](#getting-started)
  - [Run Locally (Recommended First)](#run-locally-recommended-first)
  - [Run with Docker](#run-with-docker)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Security Best Practices](#security-best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ConsumeSafe empowers Tunisian consumers to:
- Check if products are subject to boycotts
- Search through a database of **272 products**
- Discover local Tunisian alternatives
- Support ethical consumption and local economy

The application features a **trilingual interface** (Arabic, French, English) with a distinctive **Tunisian-themed design** using the national colors and Cairo typography for optimal Arabic readability.

---

## Features

### Smart Product Search
- Real-time search across 272 products
- Instant results with live status indicator
- Case-insensitive search in Arabic, French, and English

### Product Information
- **Boycott Status**: Clear visual indicators (Boycotted / Safe)
- **Product Details**: Name, brand, category, and reason for boycott
- **Alternatives**: Tunisian product recommendations
- **Visual Design**: Color-coded cards (red for boycotted, green for safe)

### Tunisian-Themed UI
- Dark gradient background (#1a1a1a to #2d1a1a)
- Red accent colors (#E31837) representing the Tunisian flag
- Geometric patterns inspired by traditional Tunisian architecture
- Cairo font for elegant Arabic typography

### Multilingual Support
- Arabic (العربية) - Primary language
- French (Français) - Secondary language
- English - International accessibility

### Admin Features
- Add new products to the database
- Modal-based product entry form
- Instant database updates

---

## DevSecOps Implementation

This project implements **DevSecOps best practices** throughout the development lifecycle, ensuring security, quality, and reliability from development to deployment.

### Security Hardening (Dev Phase)

#### Backend Security
- **Helmet.js Integration**: Automatically sets secure HTTP headers
  - Content Security Policy (CSP)
  - X-Frame-Options (clickjacking protection)
  - X-Content-Type-Options (MIME sniffing protection)
  - Strict-Transport-Security (HSTS)
  - X-XSS-Protection
  
- **Rate Limiting**: Protection against DDoS and brute-force attacks
  - Configurable request limits per IP
  - Prevents API abuse
  
- **Input Validation with Zod**: Runtime type checking and validation
  - Validates all incoming requests
  - Prevents SQL injection and malformed data
  - Schema-based validation for product creation
  
- **Environment-Based CORS**: Controlled cross-origin resource sharing
  - Development: Allows localhost origins
  - Production: Restricts to specific domains
  - Configurable via environment variables
  
- **Global Error Handler**: Centralized error management
  - Prevents sensitive information leakage
  - Logs errors securely
  - Returns safe error messages to clients

#### Frontend Security
- **Environment Variables**: Sensitive configuration stored in `.env` files
- **API URL Configuration**: Separate configs for dev/prod environments
- **Input Sanitization**: Client-side validation before API calls

### Continuous Integration & Deployment (Sec Phase)

#### GitHub Actions CI/CD Pipeline
Located in `.github/workflows/`, the pipeline includes:

**1. Automated Testing**
- Runs on every push and pull request
- Tests both frontend and backend
- Ensures code quality before merge

**2. Security Scanning**
- **CodeQL Analysis**: Automated vulnerability detection
  - Scans for common security issues
  - Identifies potential code vulnerabilities
  - Provides actionable security recommendations
  
- **npm audit**: Dependency vulnerability checking
  - Scans all dependencies for known CVEs
  - Alerts on vulnerable packages
  - Suggests security updates

**3. Dependency Management**
- **Dependabot**: Automated dependency updates
  - Weekly security updates
  - Automatic pull requests for vulnerable dependencies
  - Keeps dependencies up-to-date

#### Docker Security (Ops Phase)

**Containerization Benefits**:
- **Isolation**: Application runs in isolated containers
- **Reproducibility**: Consistent environment across dev/staging/prod
- **Resource Control**: Memory and CPU limits
- **Image Security**: Uses official Node.js base images

**Docker Compose Configuration**:
```yaml
services:
  frontend:
    - Health checks
    - Port mapping
    - Environment isolation
    
  backend:
    - Separate container
    - Database volume persistence
    - Network isolation
```

### Security Features Summary

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Helmet.js** | HTTP security headers | Protects against common web vulnerabilities |
| **Rate Limiting** | express-rate-limit | Prevents DDoS and brute-force attacks |
| **Input Validation** | Zod schemas | Blocks malformed/malicious input |
| **CORS Configuration** | Environment-based | Controls API access |
| **Error Handling** | Global middleware | Prevents info leakage |
| **CodeQL** | GitHub Actions | Automated security scanning |
| **npm audit** | CI/CD pipeline | Dependency vulnerability detection |
| **Dependabot** | GitHub integration | Automated security updates |
| **Docker** | Containerization | Isolation and consistency |
| **Environment Variables** | .env files | Secret management |

### DevSecOps Workflow

```
┌──────────────┐
│ Development  │ → Security headers, validation, error handling
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Git Push     │ → Triggers CI/CD pipeline
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CI Pipeline  │ → npm audit, CodeQL, tests
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Security OK? │ → Pass: Continue | Fail: Alert developer
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Build        │ → Docker images created
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Deployment   │ → Secure containerized application
└──────────────┘
```

---

## Getting Started

### Prerequisites
- **Node.js** version 18 or higher
- **npm** (comes with Node.js)
- **Docker** (optional, for containerized deployment)
- **Git** (for cloning the repository)

---

### Run Locally (Recommended First)

#### Step 1: Clone the Repository
```bash
git clone https://github.com/oumaymahammami/ConsumeSafe.git
cd ConsumeSafe
```

#### Step 2: Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

**Backend runs on:**
http://localhost:5050

**What happens:**
- Environment variables copied from `.env.example`
- Dependencies installed (Express, SQLite, Helmet, etc.)
- Database seeded with 272 products
- Development server starts with nodemon (auto-reload)

#### Step 3: Frontend Setup (New Terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

**Frontend runs on:**
http://localhost:5173

**What happens:**
- Environment variables copied from `.env.example`
- Dependencies installed (React, Vite, Tailwind, etc.)
- Vite development server starts with hot module replacement

#### Step 4: Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

---

### Run with Docker (1 Command Only)

For a quick containerized deployment without local Node.js setup:

#### Step 1: Prepare Environment Files
From the **root folder**:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

#### Step 2: Build and Run
```bash
docker compose up --build
```

**What happens:**
- Builds Docker images for frontend and backend
- Creates isolated containers
- Sets up internal networking
- Starts both services

**Access Points:**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5050

**Stop the containers:**
```bash
docker compose down
```

**View logs:**
```bash
docker compose logs -f
```

---

## Architecture

```
┌─────────────────┐
│                 │
│   Frontend      │
│   (React+Vite)  │
│   Port: 5173    │
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

## Tech Stack

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
- **Helmet.js** - Security headers middleware
- **express-rate-limit** - Rate limiting protection
- **Zod** - Schema validation library
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.0.2** - Development auto-reload

### DevSecOps Tools
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD automation
- **CodeQL** - Security vulnerability scanning
- **npm audit** - Dependency security checks
- **Dependabot** - Automated dependency updates
- **ESLint** - Code quality linting

---

## Project Structure

```
ConsumeSafe/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI/CD pipeline
│       └── codeql-analysis.yml    # Security scanning
│
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server + security middleware
│   │   ├── db/
│   │   │   ├── init.js            # Database initialization
│   │   │   └── seed.js            # Seed 272 products
│   │   └── routes/
│   │       └── products.js        # API routes with validation
│   ├── .env.example               # Environment template
│   ├── .gitignore                 # Ignored files
│   ├── Dockerfile                 # Backend container config
│   └── package.json               # Dependencies + scripts
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
│   ├── .env.example               # Environment template
│   ├── .gitignore                 # Ignored files
│   ├── Dockerfile                 # Frontend container config
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json               # Dependencies + scripts
│
├── .gitignore                     # Root ignore rules
├── docker-compose.yml             # Multi-container orchestration
├── consumesafe_large_seed.json    # 272 product database
└── README.md                      # This file
```

---

## Database

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
- Beverages
- Dairy Products
- Snacks & Sweets
- Personal Care
- Household Products
- Food Products
- Coffee & Tea

To re-seed the database:
```bash
cd backend
npm run seed
```

---

## API Endpoints

### Base URL
```
http://localhost:5050/api
```

### GET `/products`
Retrieve all products or search by query.

**Query Parameters:**
- `search` (optional) - Search term for filtering products

**Security:**
- Rate limited to prevent abuse
- CORS enabled for configured origins

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

**Security:**
- Input validated with Zod schema
- Required fields enforced
- Type checking on all inputs

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

**Validation Rules:**
- `name`: Required string
- `name_ar`: Optional string
- `brand`: Required string
- `category`: Required string
- `is_boycotted`: Required boolean (0 or 1)
- `reason`: Optional string
- `alternative`: Optional string

**Response:**
```json
{
  "id": 273,
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "Category",
  "is_boycotted": 1
}
```

---

## Security Best Practices

### For Developers

1. **Never Commit Sensitive Data**
   - Use `.env` files for secrets
   - Add `.env` to `.gitignore`
   - Use `.env.example` as template

2. **Keep Dependencies Updated**
   - Run `npm audit` regularly
   - Review Dependabot PRs promptly
   - Update packages with security patches

3. **Validate All Inputs**
   - Use Zod schemas for validation
   - Sanitize user inputs
   - Never trust client-side data

4. **Use Security Headers**
   - Helmet.js is configured by default
   - Review CSP policies
   - Enable HSTS in production

5. **Implement Rate Limiting**
   - Configured for API endpoints
   - Adjust limits based on needs
   - Monitor for abuse patterns

### For Deployment

1. **Environment Configuration**
   - Set proper CORS origins in production
   - Use strong secrets for production
   - Enable HTTPS/SSL certificates

2. **Docker Security**
   - Use official base images
   - Run containers as non-root user
   - Scan images for vulnerabilities

3. **Monitoring**
   - Enable application logging
   - Monitor rate limit violations
   - Set up alerts for security events

---

## Contributing

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
- Run security checks before PR

---

## License

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

## Contact & Support

- **GitHub**: [github.com/oumaymahammami/ConsumeSafe](https://github.com/oumaymahammami/ConsumeSafe)
- **Issues**: Report bugs or request features via GitHub Issues

---

## Acknowledgments

- Tunisian community for local product information
- Open-source contributors
- All users supporting ethical consumption

---

<div align="center">

**Made with care in Tunisia**

*استهلك بوعي • Consommez consciemment • Consume Consciously*

</div>
