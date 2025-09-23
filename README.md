# Product Backend

Backend built with **Node.js**, **TypeScript**, and **Prisma**.
API documentation is available with **Swagger**.

---

## Tech Stack

* Node.js + TypeScript
* Prisma (PostgreSQL)
* Express
* Swagger (API Docs)

---

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Start the server:

   ```bash
   npm start
   ```

---

## API Docs

Swagger UI:
👉 [https://product-backend-production-158b.up.railway.app/api-docs/](https://product-backend-production-158b.up.railway.app/api-docs/)

---

## Sample `curl` Requests

### 1. Get all products

```bash
curl -X GET "https://product-backend-production-158b.up.railway.app/api/products"
```

With category filter:

```bash
curl -X GET "https://product-backend-production-158b.up.railway.app/api/products?category=Electronics"
```

---

### 2. Get a product by ID

```bash
curl -X GET "https://product-backend-production-158b.up.railway.app/api/products/clp1x2y3z4a5b6c7d8e9f0"
```

---

### 3. Create a new product

```bash
curl -X POST "https://product-backend-production-158b.up.railway.app/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro 16\"",
    "description": "Powerful laptop for professionals",
    "price": 2499.99,
    "image": "https://example.com/macbook.jpg",
    "category": "Electronics",
    "isAvailable": true
  }'
```

With variants:

```bash
curl -X POST "https://product-backend-production-158b.up.railway.app/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": 999.99,
    "image": "https://example.com/iphone.jpg",
    "category": "Electronics",
    "isAvailable": true,
    "variants": [
      { "name": "Color", "value": "Space Black", "stock": 50 },
      { "name": "Storage", "value": "256GB", "stock": 30 }
    ]
  }'
```

---

## Environment

Create a `.env` file with your database connection:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000
```
