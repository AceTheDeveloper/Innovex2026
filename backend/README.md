# 🤝 JobMatch AI — Backend API

> AI-powered job matching platform for the Philippine and Indonesian labor markets. Built with Next.js, TypeScript, and Google Gemini AI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Data Models](#data-models)
- [API Reference](#api-reference)
  - [Auth](#auth)
  - [Jobs](#jobs)
  - [Applicants](#applicants)
  - [Matching](#matching)
- [AI Extraction](#ai-extraction)
- [How Matching Works](#how-matching-works)
- [Demo Seed Data](#demo-seed-data)

---

## Overview

JobMatch AI is a mobile-first job matching platform that uses AI to intelligently connect employers with applicants in the Philippines and Indonesia. Unlike traditional keyword-based job platforms, JobMatch AI uses large language models to understand context, transferable skills, and career trajectory.

**Key Features:**

- Employer job posting via document upload (`.pdf`, `.docx`) or text input
- Applicant resume upload with AI-powered structured extraction
- Semantic job-applicant matching with explainable scores
- Two-way matching: employer finds applicants, applicant finds jobs
- Gap analysis — tells applicants what skills they're missing per job
- OFW / overseas job filtering for Philippine applicants
- Localized context for both PH and Indonesian labor markets

---

## Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| Framework        | Next.js 14 (App Router)     |
| Language         | TypeScript                  |
| AI Model         | Google Gemini 2.5 Flash     |
| Auth             | JWT + bcryptjs              |
| Database         | JSON flat files (prototype) |
| Document Parsing | mammoth (docx), unpdf (pdf) |
| ID Generation    | Node.js crypto.randomUUID   |

---

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts     # POST /api/auth/register
│   │   │   └── login/route.ts        # POST /api/auth/login
│   │   ├── jobs/
│   │   │   └── route.ts              # POST /api/jobs, GET /api/jobs
│   │   ├── applicants/
│   │   │   └── resume/route.ts       # POST /api/applicants/resume, GET /api/applicants/resume
│   │   └── match/
│   │       ├── employer/route.ts     # GET /api/match/employer?jobId=
│   │       └── applicant/route.ts    # GET /api/match/applicant?applicantId=
│   ├── lib/
│   │   ├── gemini.ts                 # AI extraction + matching functions
│   │   └── auth.ts                   # JWT sign + verify helpers
│   ├── helpers/
│   │   └── generateUUID.ts           # UUID generation
│   └── intefaces/
│       ├── Jobs.ts                   # Job + JobExtracted types
│       └── Applicants.ts             # Applicant + ApplicantExtracted types
├── data/
│   ├── users.json                    # Registered users
│   ├── jobs.json                     # Posted jobs
│   └── applicants.json               # Applicant profiles
├── .env.local                        # Environment variables
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables below)

# Create data directory and seed files
mkdir -p data
echo "[]" > data/users.json
echo "[]" > data/jobs.json
echo "[]" > data/applicants.json

# Start development server
npm run dev
```

Server runs on `http://localhost:3000`

---

## Environment Variables

Create a `.env.local` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_super_secret_jwt_key_here
```

| Variable         | Description                       | Where to Get                                       |
| ---------------- | --------------------------------- | -------------------------------------------------- |
| `GEMINI_API_KEY` | Google Gemini AI API key          | [aistudio.google.com](https://aistudio.google.com) |
| `JWT_SECRET`     | Secret key for signing JWT tokens | Any random string                                  |

---

## Data Models

### User

```typescript
{
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hashed
  role: "applicant" | "employer";
  country: "PH" | "ID";
  createdAt: string;
}
```

### Job

```typescript
{
  id: string
  employerId: string
  title: string
  company: string
  location: string
  country: "PH" | "ID"
  isOverseas: boolean
  rawText: string         // raw JD text extracted from file or typed input
  extracted: {
    requirements: string[]
    niceToHave: string[]
    experienceYears: number
    skills: string[]
    salaryRange: string | null
  }
  createdAt: string
}
```

### Applicant

```typescript
{
  id: string
  userId: string
  name: string
  email: string
  country: "PH" | "ID"
  isOpenToOverseas: boolean
  rawText: string         // raw resume text extracted from file or typed input
  extracted: {
    skills: string[]
    experienceYears: number
    education: string
    previousRoles: string[]
    certifications: string[]
    languages: string[]
  }
  createdAt: string
}
```

---

## API Reference

> All protected routes require: `Authorization: Bearer <token>`

---

### Auth

#### Register

```
POST /api/auth/register
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Juan dela Cruz",
  "email": "juan@email.com",
  "password": "password123",
  "role": "applicant",
  "country": "PH"
}
```

**Response `201`:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "Juan dela Cruz",
    "email": "juan@email.com",
    "role": "applicant",
    "country": "PH"
  }
}
```

---

#### Login

```
POST /api/auth/login
Content-Type: application/json
```

**Body:**

```json
{
  "email": "juan@email.com",
  "password": "password123"
}
```

**Response `200`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "applicant"
}
```

---

### Jobs

#### Post a Job

```
POST /api/jobs
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Fields:**

| Field        | Type   | Required | Description                                   |
| ------------ | ------ | -------- | --------------------------------------------- |
| `title`      | string | ✅       | Job title                                     |
| `company`    | string | ✅       | Company name                                  |
| `location`   | string | ✅       | Job location                                  |
| `country`    | string | ✅       | `PH` or `ID`                                  |
| `isOverseas` | string | ✅       | `"true"` or `"false"`                         |
| `text`       | string | ⚠️       | Job description as text (required if no file) |
| `file`       | File   | ⚠️       | `.pdf` or `.docx` file (required if no text)  |

**Response `201`:**

```json
{
  "message": "Job posted successfully",
  "job": {
    "id": "uuid",
    "employerId": "uuid",
    "title": "ICU Nurse",
    "company": "Makati Medical Center",
    "location": "Makati, Philippines",
    "country": "PH",
    "isOverseas": false,
    "rawText": "We are looking for...",
    "extracted": {
      "requirements": ["Registered Nurse", "2 years ICU experience"],
      "niceToHave": ["EMR systems knowledge"],
      "experienceYears": 2,
      "skills": ["ICU care", "BLS", "ACLS"],
      "salaryRange": "PHP 35,000 - 45,000"
    },
    "createdAt": "2026-01-03T00:00:00.000Z"
  }
}
```

---

#### Get All Jobs

```
GET /api/jobs
```

**Response `200`:** Array of all job objects.

---

### Applicants

#### Upload Resume

```
POST /api/applicants/resume
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Fields:**

| Field              | Type   | Required | Description                                  |
| ------------------ | ------ | -------- | -------------------------------------------- |
| `userId`           | string | ✅       | User ID from auth                            |
| `name`             | string | ✅       | Applicant full name                          |
| `email`            | string | ✅       | Applicant email                              |
| `country`          | string | ✅       | `PH` or `ID`                                 |
| `isOpenToOverseas` | string | ✅       | `"true"` or `"false"`                        |
| `text`             | string | ⚠️       | Resume as text (required if no file)         |
| `file`             | File   | ⚠️       | `.pdf` or `.docx` file (required if no text) |

> If the same `userId` uploads again, their profile is **updated** not duplicated.

**Response `201`:**

```json
{
  "message": "Resume uploaded successfully",
  "applicant": {
    "id": "uuid",
    "userId": "uuid",
    "name": "Juan dela Cruz",
    "email": "juan@email.com",
    "country": "PH",
    "isOpenToOverseas": true,
    "extracted": {
      "skills": ["ICU care", "BLS", "ACLS", "patient monitoring"],
      "experienceYears": 3,
      "education": "BSN, University of Santo Tomas 2021",
      "previousRoles": ["Staff Nurse", "ICU Nurse"],
      "certifications": ["BLS", "ACLS"],
      "languages": ["English", "Filipino"]
    },
    "createdAt": "2026-01-04T00:00:00.000Z"
  }
}
```

---

#### Get All Applicants

```
GET /api/applicants/resume
```

**Response `200`:** Array of all applicant objects.

---

### Matching

#### Employer — Find Best Applicants for a Job

```
GET /api/match/employer?jobId=<jobId>
Authorization: Bearer <token>
```

**Query Params:**

| Param   | Required | Description                    |
| ------- | -------- | ------------------------------ |
| `jobId` | ✅       | ID of the job to match against |

**Response `200`:**

```json
{
  "job": {
    "id": "uuid",
    "title": "ICU Nurse",
    "company": "Makati Medical Center"
  },
  "totalApplicants": 10,
  "topMatches": [
    {
      "applicantId": "uuid",
      "name": "Juan dela Cruz",
      "matchScore": 92,
      "reason": "Juan has 3 years of ICU experience which directly matches the role. His BLS and ACLS certifications are explicitly required. His EMR proficiency is a strong bonus.",
      "gaps": ["Shifting schedule experience not mentioned in resume"]
    }
  ]
}
```

---

#### Applicant — Find Best Jobs for an Applicant

```
GET /api/match/applicant?applicantId=<applicantId>
Authorization: Bearer <token>
```

**Query Params:**

| Param         | Required | Description                          |
| ------------- | -------- | ------------------------------------ |
| `applicantId` | ✅       | ID of the applicant to match against |

**Response `200`:**

```json
{
  "applicant": {
    "id": "uuid",
    "name": "Juan dela Cruz",
    "email": "juan@email.com"
  },
  "totalJobs": 5,
  "topMatches": [
    {
      "jobId": "uuid",
      "title": "ICU Nurse",
      "company": "Makati Medical Center",
      "matchScore": 92,
      "reason": "This role aligns perfectly with Juan's 3 years of ICU experience and certifications.",
      "gaps": ["Shifting schedule experience not mentioned"]
    }
  ]
}
```

---

## AI Extraction

All document processing is handled by **Google Gemini 2.5 Flash** via `/app/lib/gemini.ts`.

### Functions

| Function                                | Input                  | Output                                 |
| --------------------------------------- | ---------------------- | -------------------------------------- |
| `extractJobData(rawText)`               | Raw JD text            | Structured `JobExtracted` object       |
| `extractResumeData(rawText)`            | Raw resume text        | Structured `ApplicantExtracted` object |
| `matchApplicantsToJob(job, applicants)` | Job + applicants array | Top 5 ranked applicants with scores    |
| `matchJobsToApplicant(applicant, jobs)` | Applicant + jobs array | Top 5 ranked jobs with scores          |

### Supported File Types

- `.pdf` — extracted via `unpdf`
- `.docx` — extracted via `mammoth`

---

## How Matching Works

1. **Extraction** — When a JD or resume is uploaded, Gemini extracts structured data (skills, experience, requirements) and saves it alongside the raw text in JSON.

2. **Matching** — When a match is requested, the extracted profiles of both the job and applicants/jobs are sent to Gemini with a structured prompt.

3. **Scoring** — Gemini returns a match score (0–100), a plain-language reason, and a list of gaps for each match.

4. **Ranking** — Results are sorted by score descending, top 5 returned.

```
Employer requests match for Job A
        ↓
Load Job A extracted data
        ↓
Load all applicant extracted profiles
        ↓
Send both to Gemini with ranking prompt
        ↓
Gemini returns top 5 ranked applicants with scores + gaps
        ↓
Return to employer
```

---

## Demo Seed Data

To quickly populate the app for demo purposes, paste these into your JSON files:

### `data/users.json`

```json
[
  {
    "id": "user-employer-001",
    "name": "Maria Santos",
    "email": "maria@makatimedical.com",
    "password": "$2b$10$hashedpassword",
    "role": "employer",
    "country": "PH",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "user-applicant-001",
    "name": "Juan dela Cruz",
    "email": "juan@email.com",
    "password": "$2b$10$hashedpassword",
    "role": "applicant",
    "country": "PH",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

> For demo, register users properly via `/api/auth/register` so passwords are correctly hashed.

---

_Built for INNOVEX 2026 — AI-Powered Job Matching for PH & Indonesia_ 🇵🇭🇮🇩
