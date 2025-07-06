# Incident Reporting System

A full-stack web application for reporting, managing, and resolving incidents efficiently.

## Project Structure

```
Incident-Reporting-System/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    uploads/
    .env
    package.json
    server.js
  frontend/
    public/
    src/
    index.html
    package.json
    tailwind.config.js
    vite.config.js
```

---

## Backend

### Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for file uploads)
- Google Generative AI (for severity prediction)

### Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Environment Variables:**
   - Copy `.env.example` to `.env` and fill in required values (MongoDB URI, Cloudinary keys, etc.).

3. **Run the server:**
   ```sh
   npm start
   ```
   The server runs on `http://localhost:5000` by default.

---

## Frontend

### Tech Stack

- React
- Vite
- Tailwind CSS
- DaisyUI
- React Router

### Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173` by default.

---

## Features

- User registration with document/photo upload
- Admin approval workflow
- Incident reporting and management
- Severity prediction using AI
- User profiles and notifications
- Responsive UI with Tailwind CSS

---

## Scripts

### Backend

- `npm start` — Start the backend server

### Frontend

- `npm run dev` — Start the frontend dev server
- `npm run build` — Build for production

---

## License

MIT

---

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Google Generative AI](https://ai.google.dev/)
