# 💸 FinanceAI Frontend (Next.js)

This is the frontend for **FinanceAI**, a personal finance dashboard built with Next.js and Firebase Authentication. It communicates with the Django backend through secure REST APIs.

---

## 🚀 Tech Stack

- Next.js 14
- React
- Firebase Auth (Client SDK)
- Tailwind CSS (optional)
- Axios / Fetch for API calls

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/payallenka/financeAi-Frontend.git
cd financeAi-Frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Create `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

> 🔐 You can find the Firebase config from your Firebase Console under **Project Settings > General > Your apps**.

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit the app at: [http://localhost:3001](http://localhost:3001)

---

## 🌐 API Connection

Make sure the backend is running on `http://localhost:8000` so the frontend can successfully fetch and post data via:

```
http://localhost:8000/api/
```

---

## 🔐 Firebase Authentication

This app uses Firebase client-side authentication. After logging in, the Firebase ID token is sent with API requests and validated by Django on the backend.

---

## 📁 Directory Overview

- `pages/`: Route-based views
- `components/`: Reusable UI components
- `utils/`: API clients and helpers
- `firebase.js`: Firebase initialization

---

## 🛡️ Security Tips

- Keep `.env.local` secrets out of version control
- Use HTTPS and environment-based config in production

---

## 📜 License

MIT License © 2025 Payal Lenka
