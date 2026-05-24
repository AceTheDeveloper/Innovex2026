### Project API Docs

## BASE URL

```
http://localhost:3000/api
```

## Endpoints

## ========= AUTH =========

## POST `/api/register`

creates a new user account

** Request Body **

```json
{
    "name" : "Sample Name",
    "email" : "sample@test.com",
    "password" : "samplePassword123",
    "role" : "applicant OR Employer",
    "country" : "PH",
}

**responses**
| Status | Message |
|--------|---------|
| 200 | Account Created |
| 400 | User Already Exists |
```

## POST `api/login`

login to an existing account

** Request Body **

```json
{
  "email": "email@test.com",
  "password": "password123"
}
```

## POST `api/jobs`

EMPLOYER WILL POST A JOB
** Request Body **

```json
{
  "id": "string",
  "employerId": "string",
  "title": "string",
  "company": "string",
  "location": "string",
  "country": "PH" | "ID",
  "isOverseas": "boolean",
  "rawText": "string",
  "extracted": "JobExtracted | null",
  "createdAt": "string",
}

```
