import { GoogleGenerativeAI } from "@google/generative-ai";
import { JobExtracted } from "../intefaces/Jobs";
import { ApplicantExtracted } from "../intefaces/Applicants";
import { Applicants } from "../intefaces/Applicants";
import { Job } from "../intefaces/Jobs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function extractJobData(rawText: string): Promise<JobExtracted> {
  const prompt = `
    You are an expert HR analyst. Extract structured information from the job description below.
    
    Return ONLY a valid JSON object with no markdown, no backticks, no explanation. Just raw JSON.
    
    Required format:
    {
      "requirements": ["list of must-have qualifications"],
      "niceToHave": ["list of optional qualifications"],
      "experienceYears": <number, 0 if not specified>,
      "skills": ["list of technical and soft skills required"],
      "salaryRange": "<salary range as string or null if not mentioned>"
    }

    Job Description:
    ${rawText}
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    return JSON.parse(text) as JobExtracted;
  } catch {
    // Clean up if Gemini adds accidental backticks
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as JobExtracted;
  }
}

export async function extractResumeData(
  rawText: string,
): Promise<ApplicantExtracted> {
  const prompt = `
    You are an expert HR analyst. Extract structured information from the resume below.
    
    Return ONLY a valid JSON object with no markdown, no backticks, no explanation. Just raw JSON.
    
    Required format:
    {
      "skills": ["list of technical and soft skills"],
      "experienceYears": <total years of experience as number, 0 if fresh grad>,
      "education": "<highest educational attainment as string>",
      "previousRoles": ["list of previous job titles"],
      "certifications": ["list of certifications, empty array if none"],
      "languages": ["list of languages spoken, always include English if mentioned"]
    }

    Resume:
    ${rawText}
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    return JSON.parse(text) as ApplicantExtracted;
  } catch {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as ApplicantExtracted;
  }
}

export async function matchApplicantsToJob(
  job: Job,
  applicants: Applicant[],
): Promise<any> {
  const prompt = `
    You are an expert HR recruiter. Your job is to rank applicants for a job opening.

    Return ONLY a valid JSON array with no markdown, no backticks, no explanation. Just raw JSON.

    Return the TOP 5 best matching applicants in this format:
    [
      {
        "applicantId": "<applicant id>",
        "name": "<applicant name>",
        "matchScore": <number from 0 to 100>,
        "reason": "<2-3 sentence explanation of why they are a good match>",
        "gaps": ["<missing skill or qualification 1>", "<missing skill or qualification 2>"]
      }
    ]

    Sort by matchScore descending. If fewer than 5 applicants exist return all of them.

    JOB DETAILS:
    Title: ${job.title}
    Company: ${job.company}
    Location: ${job.location}
    Country: ${job.country}
    Overseas: ${job.isOverseas}
    Requirements: ${JSON.stringify(job.extracted?.requirements)}
    Skills Needed: ${JSON.stringify(job.extracted?.skills)}
    Experience Required: ${job.extracted?.experienceYears} years
    Nice to Have: ${JSON.stringify(job.extracted?.niceToHave)}

    APPLICANTS:
    ${JSON.stringify(
      applicants.map((a) => ({
        id: a.id,
        name: a.name,
        country: a.country,
        isOpenToOverseas: a.isOpenToOverseas,
        skills: a.extracted?.skills,
        experienceYears: a.extracted?.experienceYears,
        education: a.extracted?.education,
        previousRoles: a.extracted?.previousRoles,
        certifications: a.extracted?.certifications,
        languages: a.extracted?.languages,
      })),
      null,
      2,
    )}
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
}

export async function matchJobsToApplicant(
  applicant: Applicants,
  jobs: Job[],
): Promise<any> {
  const prompt = `
    You are an expert career counselor. Your job is to recommend the best job matches for an applicant.

    Return ONLY a valid JSON array with no markdown, no backticks, no explanation. Just raw JSON.

    Return the TOP 5 best matching jobs in this format:
    [
      {
        "jobId": "<job id>",
        "title": "<job title>",
        "company": "<company name>",
        "matchScore": <number from 0 to 100>,
        "reason": "<2-3 sentence explanation of why this job fits the applicant>",
        "gaps": ["<skill or qualification the applicant is missing for this role>"]
      }
    ]

    Sort by matchScore descending. If fewer than 5 jobs exist return all of them.

    APPLICANT PROFILE:
    Name: ${applicant.name}
    Country: ${applicant.country}
    Open to Overseas: ${applicant.isOpenToOverseas}
    Skills: ${JSON.stringify(applicant.extracted?.skills)}
    Experience: ${applicant.extracted?.experienceYears} years
    Education: ${applicant.extracted?.education}
    Previous Roles: ${JSON.stringify(applicant.extracted?.previousRoles)}
    Certifications: ${JSON.stringify(applicant.extracted?.certifications)}
    Languages: ${JSON.stringify(applicant.extracted?.languages)}

    AVAILABLE JOBS:
    ${JSON.stringify(
      jobs.map((j) => ({
        id: j.id,
        title: j.title,
        company: j.company,
        location: j.location,
        country: j.country,
        isOverseas: j.isOverseas,
        requirements: j.extracted?.requirements,
        skills: j.extracted?.skills,
        experienceYears: j.extracted?.experienceYears,
        niceToHave: j.extracted?.niceToHave,
        salaryRange: j.extracted?.salaryRange,
      })),
      null,
      2,
    )}
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
}
