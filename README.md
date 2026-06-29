# RolePrompt

RolePrompt is an AI-powered interview preparation platform that analyzes a candidate's resume, self-introduction, and job description to generate a personalized interview preparation report.

The platform helps job seekers understand their strengths, identify skill gaps, prepare technical and behavioral interview questions, and even generate an ATS-friendly resume tailored to the target role.

---

## Features

- JWT-based Authentication
- Resume PDF Upload
- AI-powered Interview Report Generation
- Resume-Job Match Score
- Personalized Technical Interview Questions
- Behavioral Interview Questions with Suggested Answers
- Skill Gap Analysis
- Multi-day Preparation Plan
- AI-generated ATS-friendly Resume PDF
- Interview Report History
- Protected Routes

---

## Project Structure

```
RolePrompt
│
├── Frontend
│   ├── React
│   ├── Vite
│   ├── Tailwind CSS
│   └── React Router
│
└── backend
    ├── Express.js
    ├── MongoDB
    ├── Google Gemini API
    ├── JWT Authentication
    ├── Puppeteer
    └── Multer
```

---

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Google Gemini API
- Puppeteer
- Zod

---

## Workflow

1. User registers or logs in.
2. Uploads their resume (PDF).
3. Enters:
   - Self introduction
   - Target Job Description
4. AI analyzes all inputs.
5. Generates:
   - Resume Match Score
   - Technical Interview Questions
   - Behavioral Questions
   - Skill Gap Analysis
   - Preparation Plan
6. User can revisit previous reports.
7. AI can generate an optimized resume PDF.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

### Interview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/interview` | Generate interview report |
| GET | `/api/interview` | Fetch all interview reports |
| GET | `/api/interview/report/:interviewId` | Fetch interview report by ID |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate ATS-friendly resume PDF |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/RolePrompt.git

cd RolePrompt
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Run backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## Future Improvements

- Mock Interview Chatbot
- Voice-based Interview Practice
- Company-specific Interview Preparation
- Resume ATS Score Breakdown
- Interview Progress Tracking
- Export Reports as PDF
- Email Report Sharing

---

## Author

Developed by **Gourav**

GitHub: https://github.com/gouravez

---

## 📄 License

This project is licensed under the MIT License.
