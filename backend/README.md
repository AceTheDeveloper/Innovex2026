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
  - [Gap Analysis](#gap-analysis)
- [AI Extraction](#ai-extraction)
- [How Matching Works](#how-matching-works)
- [Postman Payloads](#postman-payloads)
- [Demo Seed Data](#demo-seed-data)

---

## Overview

JobMatch AI is a mobile-first job matching platform that uses AI to intelligently connect employers with applicants in the Philippines and Indonesia. Unlike traditional keyword-based job platforms, JobMatch AI uses large language models to understand context, transferable skills, and career trajectory.

**Key Features:**

- Employer job posting via document upload (`.pdf`, `.docx`) or text input
- Applicant resume upload with AI-powered structured extraction
- Semantic job-applicant matching with explainable scores
- Two-way matching: employer finds applicants, applicant finds jobs
- Detailed gap analysis with upskilling suggestions
- OFW / overseas job filtering for Philippine applicants
- Keyword search and country filtering on job listings
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
│   │   │   ├── register/route.ts         # POST /api/auth/register
│   │   │   └── login/route.ts            # POST /api/auth/login
│   │   ├── jobs/
│   │   │   ├── route.ts                  # POST /api/jobs, GET /api/jobs
│   │   │   └── [id]/route.ts             # GET /api/jobs/:id
│   │   ├── applicants/
│   │   │   ├── resume/route.ts           # POST /api/applicants/resume, GET /api/applicants/resume
│   │   │   └── [id]/route.ts             # GET /api/applicants/:id
│   │   ├── match/
│   │   │   ├── employer/route.ts         # GET /api/match/employer?jobId=
│   │   │   └── applicant/route.ts        # GET /api/match/applicant?applicantId=
│   │   └── gap/
│   │       └── route.ts                  # GET /api/gap?applicantId=&jobId=
│   ├── lib/
│   │   ├── gemini.ts                     # AI extraction + matching functions
│   │   ├── auth.ts                       # JWT sign + verify helpers
│   │   ├── db.ts                         # JSON read/write helpers
│   │   └── getUser.ts                    # Auth middleware helper
│   ├── helpers/
│   │   └── generateUUID.ts               # UUID generation
│   └── intefaces/
│       ├── Jobs.ts                       # Job + JobExtracted types
│       └── Applicants.ts                 # Applicant + ApplicantExtracted types
├── data/
│   ├── users.json                        # Registered users
│   ├── jobs.json                         # Posted jobs
│   └── applicants.json                   # Applicant profiles
├── .env.local                            # Environment variables
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

### Match Result

```typescript
{
  applicantId | jobId: string
  name | title: string
  matchScore: number        // 0 to 100
  reason: string            // plain language explanation
  gaps: string[]            // missing skills or qualifications
}
```

### Gap Analysis

```typescript
{
  overallMatch: number
  strengths: string[]
  gaps: {
    skill: string
    importance: "critical" | "moderate" | "minor"
    suggestion: string
  }[]
  upskilling: {
    resource: string
    provider: string
    reason: string
  }[]
  verdict: string
}
```

---

## API Reference

> 🔒 Protected routes require: `Authorization: Bearer <token>`
>
> Get your token from `POST /api/login`

---

### Auth

#### Register

```
POST /api/register
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Juan dela Cruz",
  "email": "juan@email.com",
  "password": "password",
  "role": "applicant",
  "country": "PH"
}
```

| Field      | Type   | Required | Values                    |
| ---------- | ------ | -------- | ------------------------- |
| `name`     | string | ✅       | Full name                 |
| `email`    | string | ✅       | Valid email               |
| `password` | string | ✅       | Min 6 characters          |
| `role`     | string | ✅       | `applicant` or `employer` |
| `country`  | string | ✅       | `PH` or `ID`              |

**Response `201`:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "Juan dela Cruz",
    "email": "juan@email.com",
    "role": "applicant",
    "country": "PH",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

#### Login

```
POST /api/login
Content-Type: application/json
```

**Body:**

```json
{
  "email": "juan@email.com",
  "password": "password"
}
```

**Response `200`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "applicant"
}
```

> Save the `token` — you'll need it in the `Authorization` header for all protected routes.

---

### Jobs

#### Post a Job 🔒

```
POST /api/jobs
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

| Field        | Type   | Required | Description                                   |
| ------------ | ------ | -------- | --------------------------------------------- |
| `title`      | string | ✅       | Job title                                     |
| `company`    | string | ✅       | Company name                                  |
| `location`   | string | ✅       | Job location                                  |
| `country`    | string | ✅       | `PH` or `ID`                                  |
| `isOverseas` | string | ✅       | `"true"` or `"false"`                         |
| `text`       | string | ⚠️       | Job description as text (required if no file) |
| `file`       | File   | ⚠️       | `.pdf` or `.docx` (required if no text)       |

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

#### Get All Jobs (with filters)

```
GET /api/jobs
GET /api/jobs?country=PH
GET /api/jobs?country=PH&isOverseas=false
GET /api/jobs?search=nurse
GET /api/jobs?country=PH&isOverseas=true&search=nurse
```

| Query Param  | Type   | Description                                |
| ------------ | ------ | ------------------------------------------ |
| `country`    | string | Filter by `PH` or `ID`                     |
| `isOverseas` | string | `"true"` for overseas, `"false"` for local |
| `search`     | string | Search by title, company, or location      |

**Response `200`:**

```json
{
  "total": 3,
  "jobs": [ ...array of job objects ]
}
```

---

#### Get Single Job

```
GET /api/jobs/:id
```

**Response `200`:** Single job object.

**Response `404`:**

```json
{ "error": "Job not found" }
```

---

### Applicants

#### Upload Resume 🔒

```
POST /api/applicants/resume
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

| Field              | Type   | Required | Description                             |
| ------------------ | ------ | -------- | --------------------------------------- |
| `userId`           | string | ✅       | User ID from auth                       |
| `name`             | string | ✅       | Applicant full name                     |
| `email`            | string | ✅       | Applicant email                         |
| `country`          | string | ✅       | `PH` or `ID`                            |
| `isOpenToOverseas` | string | ✅       | `"true"` or `"false"`                   |
| `text`             | string | ⚠️       | Resume as text (required if no file)    |
| `file`             | File   | ⚠️       | `.pdf` or `.docx` (required if no text) |

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
      "certifications": ["BLS", "ACLS", "PRC License"],
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

#### Get Single Applicant

```
GET /api/applicants/:id
```

**Response `200`:** Single applicant object.

**Response `404`:**

```json
{ "error": "Applicant not found" }
```

---

### Matching

#### Employer — Find Best Applicants for a Job 🔒

```
GET /api/match/employer?jobId=<jobId>
Authorization: Bearer <token>
```

| Query Param | Required | Description                    |
| ----------- | -------- | ------------------------------ |
| `jobId`     | ✅       | ID of the job to match against |

> If the job is overseas, only applicants with `isOpenToOverseas: true` are considered.

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
      "reason": "Juan has 3 years of ICU experience which directly matches the role. His BLS and ACLS certifications are explicitly required.",
      "gaps": ["Shifting schedule experience not mentioned in resume"]
    }
  ]
}
```

---

#### Applicant — Find Best Jobs 🔒

```
GET /api/match/applicant?applicantId=<applicantId>
Authorization: Bearer <token>
```

| Query Param   | Required | Description                          |
| ------------- | -------- | ------------------------------------ |
| `applicantId` | ✅       | ID of the applicant to match against |

> If the applicant has `isOpenToOverseas: false`, overseas jobs are automatically excluded.

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

### Gap Analysis

#### Analyze Skill Gaps Between Applicant and Job 🔒

```
GET /api/gap?applicantId=<applicantId>&jobId=<jobId>
Authorization: Bearer <token>
```

| Query Param   | Required | Description         |
| ------------- | -------- | ------------------- |
| `applicantId` | ✅       | ID of the applicant |
| `jobId`       | ✅       | ID of the job       |

**Response `200`:**

```json
{
  "applicant": {
    "id": "uuid",
    "name": "Juan dela Cruz"
  },
  "job": {
    "id": "uuid",
    "title": "ICU Nurse",
    "company": "Makati Medical Center"
  },
  "analysis": {
    "overallMatch": 88,
    "strengths": [
      "3 years of direct ICU experience",
      "BLS and ACLS certified as required",
      "EMR proficiency is a strong bonus"
    ],
    "gaps": [
      {
        "skill": "Shifting schedule experience",
        "importance": "moderate",
        "suggestion": "Highlight any night shift or rotating schedule experience in resume"
      }
    ],
    "upskilling": [
      {
        "resource": "Critical Care Nursing Course",
        "provider": "TESDA",
        "reason": "Strengthens ICU competency and adds a formal certification"
      }
    ],
    "verdict": "Juan is a strong candidate and should apply immediately with minor resume improvements."
  }
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
| `analyzeGaps(applicant, job)`           | Applicant + job        | Detailed gap analysis with upskilling  |

### Supported File Types

- `.pdf` — extracted via `unpdf`
- `.docx` — extracted via `mammoth`

---

## How Matching Works

```
Employer requests match for Job A
        ↓
Load Job A extracted data from jobs.json
        ↓
Load all applicants from applicants.json
Filter: overseas jobs → only open-to-overseas applicants
        ↓
Send job + applicants to Gemini with ranking prompt
        ↓
Gemini returns top 5 ranked applicants
with match scores, reasons, and gaps
        ↓
Return shortlist to employer

─────────────────────────────────────

Applicant requests job recommendations
        ↓
Load applicant profile from applicants.json
        ↓
Load all jobs from jobs.json
Filter: not open to overseas → exclude overseas jobs
        ↓
Send applicant + jobs to Gemini with ranking prompt
        ↓
Gemini returns top 5 recommended jobs
with match scores, reasons, and gaps
        ↓
Return recommendations to applicant
```

---

## Postman Payloads

### Auth — Register Employer

```
POST http://localhost:3000/api/register
Body → raw → JSON
```

```json
{
  "name": "Maria Santos",
  "email": "maria@makatimedical.com",
  "password": "password",
  "role": "employer",
  "country": "PH"
}
```

### Auth — Register Applicant

```
POST http://localhost:3000/api/register
Body → raw → JSON
```

```json
{
  "name": "Juan dela Cruz",
  "email": "juan@email.com",
  "password": "password",
  "role": "applicant",
  "country": "PH"
}
```

### Auth — Login

```
POST http://localhost:3000/api/login
Body → raw → JSON
```

```json
{
  "email": "maria@makatimedical.com",
  "password": "password"
}
```

### Jobs — Post Local Job (bulk edit)

```
POST http://localhost:3000/api/jobs
Authorization: Bearer <token>
Body → form-data → bulk edit
```

```
title:ICU Nurse
company:Makati Medical Center
location:Makati, Philippines
country:PH
isOverseas:false
text:We are looking for a Registered Nurse with at least 2 years of ICU experience. Must be BLS and ACLS certified. Experience with patient monitoring systems is required. Knowledge of EMR systems is a plus. Salary range: PHP 35,000 - 45,000 per month.
```

### Jobs — Post Overseas Job (bulk edit)

```
POST http://localhost:3000/api/jobs
Authorization: Bearer <token>
Body → form-data → bulk edit
```

```
title:Staff Nurse - Saudi Arabia
company:Makati Medical Center OFW Deployment
location:Riyadh, Saudi Arabia
country:PH
isOverseas:true
text:Seeking experienced nurses for deployment to Saudi Arabia. Must be a licensed Registered Nurse with at least 3 years hospital experience. NCLEX or HAAD certification is a plus. Tax-free salary of SAR 4,500 - 6,000 per month plus accommodation.
```

### Jobs — Post Indonesian Job (bulk edit)

```
POST http://localhost:3000/api/jobs
Authorization: Bearer <token>
Body → form-data → bulk edit
```

```
title:Perawat ICU
company:RS Jakarta Pusat
location:Jakarta, Indonesia
country:ID
isOverseas:false
text:Kami mencari perawat ICU berpengalaman dengan minimal 2 tahun pengalaman di unit perawatan intensif. Wajib memiliki sertifikat BLS dan ACLS. Gaji IDR 8,000,000 - 12,000,000 per bulan.
```

### Applicants — Upload Resume Juan (bulk edit)

```
POST http://localhost:3000/api/applicants/resume
Authorization: Bearer <token>
Body → form-data → bulk edit
```

```
userId:applicant-001
name:Juan dela Cruz
email:juan@email.com
country:PH
isOpenToOverseas:true
text:Registered Nurse with 3 years of ICU experience at Makati Medical Center and St. Lukes Medical Center. BLS and ACLS certified. Skilled in patient monitoring IV therapy and emergency response. Proficient in EMR systems. Bachelor of Science in Nursing University of Santo Tomas 2021.
```

### Applicants — Upload Resume Ana (bulk edit)

```
POST http://localhost:3000/api/applicants/resume
Authorization: Bearer <token>
Body → form-data → bulk edit
```

```
userId:applicant-002
name:Ana Reyes
email:ana@email.com
country:PH
isOpenToOverseas:false
text:Fresh graduate Software Engineer with internship experience in React and Node.js. Built a capstone e-commerce project using TypeScript and PostgreSQL. Familiar with REST APIs and Git. Bachelor of Science in Computer Science DLSU 2025.
```

### Applicants — Upload Resume Siti (bulk edit)

```
POST http://localhost:3000/api/applicants/resume
Authorization: Bearer <token>
Body → form-data → bulk edit
```

```
userId:applicant-003
name:Siti Rahayu
email:siti@email.com
country:ID
isOpenToOverseas:false
text:Perawat terdaftar dengan 4 tahun pengalaman di ICU RS Cipto Mangunkusumo Jakarta. Bersertifikat BLS dan ACLS. Berpengalaman dalam penggunaan ventilator dan monitoring pasien kritis. Lulusan S1 Keperawatan Universitas Indonesia 2020.
```

### Matching — Employer

```
GET http://localhost:3000/api/match/employer?jobId=<job_id>
Authorization: Bearer <token>
```

### Matching — Applicant

```
GET http://localhost:3000/api/match/applicant?applicantId=<applicant_id>
Authorization: Bearer <token>
```

### Gap Analysis

```
GET http://localhost:3000/api/gap?applicantId=<applicant_id>&jobId=<job_id>
Authorization: Bearer <token>
```

### Filter Jobs

```
GET http://localhost:3000/api/jobs?country=PH&isOverseas=false
GET http://localhost:3000/api/jobs?country=PH&isOverseas=true
GET http://localhost:3000/api/jobs?country=ID
GET http://localhost:3000/api/jobs?search=nurse
GET http://localhost:3000/api/jobs?country=PH&isOverseas=true&search=nurse
```

---

## Demo Seed Data

Paste directly into your JSON files for quick demo setup.

### `data/users.json`

```json
[
  {
    "id": "employer-001",
    "name": "Maria Santos",
    "email": "maria@makatimedical.com",
    "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    "role": "employer",
    "country": "PH",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "employer-002",
    "name": "Budi Santoso",
    "email": "budi@rsjakarta.co.id",
    "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    "role": "employer",
    "country": "ID",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "applicant-001",
    "name": "Juan dela Cruz",
    "email": "juan@email.com",
    "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    "role": "applicant",
    "country": "PH",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "applicant-002",
    "name": "Ana Reyes",
    "email": "ana@email.com",
    "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    "role": "applicant",
    "country": "PH",
    "createdAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "applicant-003",
    "name": "Siti Rahayu",
    "email": "siti@email.com",
    "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    "role": "applicant",
    "country": "ID",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

> All passwords are `password` — easy for demo! 😄

---

## Final Demo Checklist

```
✅ npm run dev runs without errors
✅ POST /api/register works for employer + applicant
✅ POST /api/login returns token
✅ POST /api/jobs creates job with AI-extracted data
✅ POST /api/applicants/resume creates profile with AI-extracted data
✅ GET /api/jobs returns all jobs
✅ GET /api/jobs?country=PH&isOverseas=true filters correctly
✅ GET /api/jobs?search=nurse searches correctly
✅ GET /api/jobs/:id returns single job
✅ GET /api/applicants/:id returns single applicant
✅ GET /api/match/employer?jobId= returns top 5 ranked applicants
✅ GET /api/match/applicant?applicantId= returns top 5 job recommendations
✅ GET /api/gap?applicantId=&jobId= returns detailed gap analysis
✅ data/users.json, jobs.json, applicants.json have seed data
```

---

_Built for INNOVEX 2026 — AI-Powered Job Matching for PH & Indonesia_ 🇵🇭🇮🇩
