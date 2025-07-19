# Wisper ISP Code Test – Full Stack Submission

This repository contains my complete full-stack solution for the Wisper ISP code challenge.

## 🔧 Contents

| Folder                         | Description                          |
|--------------------------------|--------------------------------------|
| [`frontend`](./frontend-react) | React + TypeScript frontend UI       |
| [`backend`](./backend)           | PHP 8 backend with OOP & MySQL       |
| [`customer.sql`](./sql)          | MySQL export of the `customer` table |
| [`postman/`](./postman)          | Postman collection to test the API |

---

## 🚀 Features

- ✅ Upload and parse `customer_data.csv`
- ✅ Filter customers by **state**, **city**, and **status**
- ✅ Full **CRUD** support (Add, Update, Delete)
- ✅ Search across all customer fields
- ✅ Paginated, responsive UI (10 records/page)
- ✅ Integrated React frontend and PHP backend
- ❌ (Bonus not claimed): Vue 3 frontend

---

## 📦 How to Run the Project

### 1. Backend
See [`backend/README.md`](./backend/README.md)

### 2. Frontend
See [`frontend-react/README.md`](./frontend-react/README.md)

## 🧪 Postman Collection

A ready-to-use Postman collection is available at [`../postman/WisperISP.postman_collection.json`](./postman/WisperISP.postman_collection.json).

It includes examples for:

- CSV Upload
- Customer listing with filters
- Create/Update/Delete operations
