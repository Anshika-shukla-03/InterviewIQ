# 🧠 InterviewIQ.ai

<div align="center">

![InterviewIQ.ai Banner](https://img.shields.io/badge/InterviewIQ.ai-AI%20Interview%20Platform-6C63FF?style=for-the-badge&logo=artificial-intelligence)

**An AI-powered SaaS Interview Preparation Platform built with the MERN Stack**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=flat-square&logo=razorpay)](https://razorpay.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-FF6B6B?style=flat-square)](https://openrouter.ai/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render)](https://render.com/)

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Credit System](#-credit-system)
- [Razorpay Integration](#-razorpay-integration)
- [AI Interview Logic](#-ai-interview-logic)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About the Project

**InterviewIQ.ai** is a full-stack SaaS platform that leverages AI to simulate realistic technical and HR interviews. Users upload their resume, select their role and experience level, and get a personalized set of AI-generated interview questions. After answering each question (via voice or text), the AI scores and provides feedback — helping candidates sharpen their skills before the real thing.

### Why InterviewIQ.ai?
- 🎯 **Personalized questions** based on your resume, role, and experience
- 🤖 **AI-powered scoring** with detailed feedback per answer
- 🎤 **Voice & text input** for a realistic interview feel
- 📊 **Analytics dashboard** with confidence, communication & correctness scores
- 💳 **Credit-based system** with Razorpay payment integration
- 📄 **Downloadable PDF report** of your complete interview

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (Vite), Tailwind CSS, Framer Motion, Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | Firebase Google OAuth |
| **AI Engine** | OpenRouter API |
| **File Upload** | Multer (PDF resume parsing) |
| **Payments** | Razorpay (Test Mode) |
| **Deployment** | Render (Frontend + Backend) |
| **HTTP Client** | Axios |

---

## ✨ Features

### 🔐 Authentication
- Google OAuth login via Firebase
- Protected routes with `isAuth` middleware
- Auto-assign **100 free credits** on first signup

### 📄 Resume Upload & AI Analysis
- Upload PDF resume using Multer
- AI extracts: **role, experience, skills, and projects**
- Returns structured JSON for interview personalization

### 🎤 AI Interview Engine
- Generate **5 questions** tailored to role, experience, and resume
- Progressive difficulty: Easy → Medium → Hard (Q1-Q2, Q3-Q4, Q5)
- Two interview modes: **Technical** and **HR**
- Real-time AI scoring (out of 10) + short feedback per answer

### 📊 Analytics Dashboard
- Overall score, per-question scores
- Breakdown: **Confidence**, **Communication**, **Correctness**
- Skill evaluation summary

### 💳 Credit & Payment System
- Each interview costs **50 credits**
- Credit check before starting — blocked if insufficient
- Pricing Plans:
  - 🆓 Free — 100 credits
  - 🚀 Starter — 150 credits
  - 💼 Pro — 500 credits
- Razorpay checkout with payment verification

### 📁 Additional Features
- 📜 Interview history with status tracking
- 📥 Download PDF interview report
- 🎙️ Web Speech API for voice input + text fallback
- 💫 Smooth animations with Framer Motion
- 📱 Fully responsive UI with Tailwind CSS

---

## 📁 Project Structure

```
InterviewIQ/
├── client/                         # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── InterviewSetup.jsx
│   │   │   ├── LiveInterview.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── History.jsx
│   │   │   └── Pricing.jsx
│   │   ├── store/                  # Redux Toolkit
│   │   │   ├── authSlice.js
│   │   │   └── interviewSlice.js
│   │   ├── services/               # Axios API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                         # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   ├── interviewController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── isAuth.js               # JWT/Firebase auth guard
│   │   └── upload.js               # Multer PDF upload
│   ├── models/
│   │   ├── User.js
│   │   └── Interview.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── interviewRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── openRouterService.js    # OpenRouter AI integration
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- MongoDB Atlas account
- Firebase project (Google OAuth enabled)
- OpenRouter API key
- Razorpay account (Test Mode)

### 1. Clone the Repository

```bash
git clone https://github.com/Anshika-shukla-03/InterviewIQ.ai.git
cd InterviewIQ.ai
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server` (see [Environment Variables](#-environment-variables)).

```bash
npm run dev
```

Server runs at: `http://localhost:8000`

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file in `/client` (see [Environment Variables](#-environment-variables)).

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend — `server/.env`

```env
# Server
PORT=8000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interviewiq

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project.iam.gserviceaccount.com

# OpenRouter AI
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend — `client/.env`

```env
# Vite
VITE_API_URL=http://localhost:8000

# Firebase
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

> ⚠️ **Never commit `.env` files to version control.** Both are listed in `.gitignore`.

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/login` | Login with Firebase token | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ✅ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### Resume — `/api/resume`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/resume/analyze` | Upload & analyze PDF resume | ✅ |

### Interview — `/api/interview`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/interview/create` | Create new interview (deducts 50 credits) | ✅ |
| `POST` | `/api/interview/submit-answer` | Submit answer, get score & feedback | ✅ |
| `GET` | `/api/interview/:id` | Get full interview report | ✅ |
| `GET` | `/api/interview/history/:userId` | Get user's interview history | ✅ |

### Payment — `/api/payment`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/payment/create-order` | Create Razorpay order | ✅ |
| `POST` | `/api/payment/verify` | Verify payment & credit user | ✅ |

### User — `/api/user`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/user/credits` | Get current credit balance | ✅ |
| `PATCH` | `/api/user/credits` | Update credit balance (internal) | ✅ |

---

## 🗄️ Data Models

### User Model

```javascript
{
  name: String,
  email: String,           // unique
  profilePic: String,
  credits: { type: Number, default: 100 },
  interviewHistory: [{ type: ObjectId, ref: 'Interview' }],
  createdAt: Date
}
```

### Interview Model

```javascript
{
  userId: { type: ObjectId, ref: 'User' },
  role: String,
  experience: String,
  interviewMode: { type: String, enum: ['Technical', 'HR'] },
  questions: [{
    question: String,
    answer: String,
    score: Number,        // out of 10
    feedback: String
  }],
  overallScore: Number,
  confidenceScore: Number,
  communicationScore: Number,
  correctnessScore: Number,
  status: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' },
  createdAt: Date
}
```

---

## 💳 Credit System

| Action | Credits |
|--------|---------|
| Account created (first signup) | +100 |
| Start an interview | −50 |
| Purchase Free Plan | +100 |
| Purchase Starter Plan | +150 |
| Purchase Pro Plan | +500 |

> If a user has fewer than 50 credits, they are blocked from starting a new interview and redirected to the Pricing page.

---

## 💰 Razorpay Integration

InterviewIQ.ai uses **Razorpay in Test Mode** for payment processing.

### Flow

```
User clicks "Buy Credits"
        ↓
POST /api/payment/create-order  →  Razorpay Order created
        ↓
Frontend opens Razorpay checkout
        ↓
User completes payment
        ↓
POST /api/payment/verify  →  Signature verified via HMAC SHA256
        ↓
Credits added to user account
```

### Test Credentials (Razorpay Test Mode)

Use Razorpay's test card details from their [Test Mode documentation]

---

## 🤖 AI Interview Logic

### Question Generation

OpenRouter generates exactly **5 questions** using this difficulty pattern:

| Question | Difficulty |
|----------|-----------|
| Q1, Q2 | Easy |
| Q3, Q4 | Medium |
| Q5 | Hard |

Questions are tailored using: **role + experience level + resume content + interview mode (Technical/HR)**

### Answer Evaluation

After each answer submission, the AI returns:
- **Score** (0–10)
- **Short feedback** (strength/weakness highlight)

### Final Report Scoring

At the end of all 5 questions:

| Metric | Description |
|--------|-------------|
| **Overall Score** | Average of all 5 question scores |
| **Correctness Score** | Technical accuracy of answers |
| **Communication Score** | Clarity and structure of responses |
| **Confidence Score** | Completeness and assertiveness |

---

## 🚀 Deployment

Both frontend and backend are deployed on **Render**.

### Backend Deployment (Render Web Service)

1. Connect your GitHub repo to Render
2. Set **Root Directory** to `server`
3. **Build Command:** `npm install`
4. **Start Command:** `node index.js`
5. Add all backend environment variables in Render's dashboard

### Frontend Deployment (Render Static Site)

1. Set **Root Directory** to `client`
2. **Build Command:** `npm install && npm run build`
3. **Publish Directory:** `dist`
4. Add all frontend environment variables prefixed with `VITE_`
5. Update `VITE_API_URL` to your backend Render URL



## 🖼️ Screenshots

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c50f5a75-c837-44a9-8930-e8f1cfafabfe" alt="Home Page" width="480"/>
      <br/>
      <b>🏠 Home Page</b>
      <br/>
      <sub>Hero section with AI-powered tagline, CTA buttons and feature highlights</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/dd537902-c46c-47d4-adad-ce33b7fdd4e5" alt="Interview Setup" width="480"/>
      <br/>
      <b>🛠️ Interview Setup</b>
      <br/>
      <sub>Choose role, experience, interview mode and upload your resume (optional)</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/f70f0b0b-c8d9-42c8-817c-731d431afc3a" alt="Live Interview" width="480"/>
      <br/>
      <b>🎤 Live AI Interview</b>
      <br/>
      <sub>AI interviewer avatar, countdown timer, voice input & text answer submission</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/15f08aee-e5c6-426f-8f0a-0fafc8c80409" alt="Analytics Dashboard" width="480"/>
      <br/>
      <b>📊 Analytics Dashboard</b>
      <br/>
      <sub>Overall score, performance trend chart, skill evaluation & per-question AI feedback</sub>
    </td>
  </tr>
</table>


---

## 🧪 Running Tests

```bash
# Backend (if tests are configured)
cd server
npm test

# Frontend
cd client
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please make sure to:
- Follow existing code style and naming conventions
- Add comments where necessary
- Test your changes before submitting

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Anshika-shukla-03](https://github.com/Anshika-shukla-03)
- LinkedIn: [https://www.linkedin.com/in/anshika-shukla-7531a1328/](https://www.linkedin.com/in/anshika-shukla-7531a1328/)

---

## 🙏 Acknowledgements

- [OpenRouter](https://openrouter.ai/) — AI API gateway
- [Firebase](https://firebase.google.com/) — Authentication
- [Razorpay](https://razorpay.com/) — Payment gateway
- [Render](https://render.com/) — Deployment platform
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Tailwind CSS](https://tailwindcss.com/) — Styling

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Anshika-shukla-03">Anshika Shukla</a>
  <br><br>
  ⭐ Star this repo if you found it helpful!
</div>
