# DevelopmentBooks — Frontend

Brief frontend application for the DevelopmentBooks project. Single-page app for viewing development-related books. Intended to be used together with a backend API that provides book data and basket calculation.
No tests here because there is no functionalities to be tested. All the logic happens in the backend.

## Features
- Books page
- Adding books to basket
- Auto update basket price

## Prerequisites
- Node.js (LTS recommended, e.g. 18+)
- npm or yarn
- The backend at https://github.com/ActuallyBadoura/2025-CCE-E-DEV-020-DevelopmentBooks

## Install

1. Clone the repository
  ```
  git clone https://github.com/ActuallyBadoura/2025-CCE-E-DEV-020-DevelopmentBooks-frontend developmentbooks-frontend
  cd developmentbooks-frontend
  ```

2. Install dependencies
  ```
  # using npm
  npm install

  # or using yarn
  yarn install
  ```

## Run (development)
Start the development server (hot reload):
```
# npm
npm run dev

# or yarn
yarn dev
```
Default dev server usually runs on http://localhost:3000 or http://localhost:5173 depending on the toolchain. Check console output.