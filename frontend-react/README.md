# 📦 Wisper ISP – Frontend (React + TypeScript)

This is the frontend interface for the Wisper ISP Full Stack Code Test. It consumes a [`PHP backend API`](./backend/README.md) and allows users to view, search, filter, and manage customer records.

---

## ✨ Features

- 📄 CSV upload
- 🔍 Full-text search across all customer fields
- 🧮 Pagination (10 records per page)
- ✅ Filters for:
    - Customer status (`active`, `inactive`, `cancelled`)
    - State
    - City
- 💅 Built with React + TypeScript
- 🔗 Integrated with backend PHP REST API

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Backend running on [http://localhost:8000](http://localhost:8000)

##  ⚙ Configuration

API URLs are set in [`src/config/environment.ts`](./src/config/environment.ts).

```ts
export const DEV_API_URL = [`YOUR_DEVELOPMENT_API_URI`];
export const API_URL = [`YOUR_PRODUTION_API_URI`];
export const MODE = process.env.NODE_ENV || 'development';
export const BASE_URL = MODE === 'development' ? DEV_API_URL : API_URL;
```

### Installation

### `npm install`

Installs all required dependencies

### Run the app

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
App is ready to be deployed!
