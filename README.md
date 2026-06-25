# 📋 Job Application Tracker

A full stack MERN application to track and manage job applications efficiently.

![Job Tracker](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

---

## 🌟 Live Demo

- **Frontend:** https://job-tracker-lilac-one.vercel.app
- **Backend:**  https://job-tracker-jyss.onrender.com
## 🎯 Features

- ✅ User Registration and Login
- ✅ JWT Authentication
- ✅ Add Job Applications
- ✅ Edit Job Status
- ✅ Delete Job Applications
- ✅ Filter by Status
- ✅ Applied Date Tracking
- ✅ Responsive UI Design
- ✅ Secure Password Encryption

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Vite

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- CORS
- dotenv

---

## 📁 Project Structure
job-tracker/

├── server/                 ← Backend

│   ├── middleware/

│   │   └── auth.js         ← JWT middleware

│   ├── models/

│   │   ├── User.js         ← User model

│   │   └── Job.js          ← Job model

│   ├── routes/

│   │   ├── auth.js         ← Register + Login routes

│   │   └── jobs.js         ← CRUD routes

│   ├── .env                ← Environment variables

│   └── server.js           ← Main server file

└── client/                 ← Frontend

└── src/

├── pages/

│   ├── Login.jsx

│   ├── Register.jsx

│   └── Dashboard.jsx

├── App.jsx

└── main.jsx

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Git installed

### Installation

**Step 1 — Clone the repository:**
```bash
git clone https://github.com/then15/job-tracker.git
cd job-tracker
```

**Step 2 — Install Backend Dependencies:**
```bash
cd server
npm install
```

**Step 3 — Create `.env` file in server folder:**
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

PORT=5000

**Step 4 — Start Backend:**
```bash
node server.js
```

**Step 5 — Install Frontend Dependencies:**
```bash
cd client
npm install
```

**Step 6 — Start Frontend:**
```bash
npm run dev
```

**Step 7 — Open Browser:**
http://localhost:5173

---

## 🔑 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Job Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/jobs | Add new job |
| GET | /api/jobs | Get all jobs |
| PUT | /api/jobs/:id | Update job |
| DELETE | /api/jobs/:id | Delete job |

---

## 🔐 Environment Variables
MONGO_URI=mongodb+srv://...

JWT_SECRET=your_secret_key

PORT=5000

---

## 👨‍💻 Author

**Amudhan S**
- GitHub: [@then15](https://github.com/then15)
- LinkedIn: [Then Amudhan S](https://www.linkedin.com/in/then-amudhan-s-b29b59259?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- Email: your-email@gmail.com

---

## 📄 License

This project is licensed under the MIT License.

---

