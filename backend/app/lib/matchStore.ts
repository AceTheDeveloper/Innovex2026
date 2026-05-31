import fs from "fs";
import path from "path";

const MATCHES_PATH = path.join(process.cwd(), "data", "matches.json");

export interface StoredMatch {
  type: "employer" | "applicant"
  jobId: string
  applicantId: string
  name: string          // applicant name (employer view)
  title: string         // job title (applicant view)
  company: string       // job company (applicant view)
  matchScore: number
  reason: string
  gaps: string[]
  country: string
  isOpenToOverseas: boolean
  experienceYears: number | null
}

// Employer-side match: applicant ranked against a job
export interface EmployerMatch {
  id: string
  type: "employer"
  jobId: string
  applicantId: string
  name: string
  matchScore: number
  reason: string
  gaps: string[]
  country: string
  isOpenToOverseas: boolean
  experienceYears: number | null
}

// Applicant-side match: job ranked against an applicant
export interface ApplicantMatch {
  id: string
  type: "applicant"
  applicantId: string
  jobId: string
  title: string
  company: string
  matchScore: number
  reason: string
  gaps: string[]
}

export function readMatches(): StoredMatch[] {
  if (!fs.existsSync(MATCHES_PATH)) return [];
  const content = fs.readFileSync(MATCHES_PATH, "utf-8").trim();
  if (!content) return [];
  return JSON.parse(content);
}

export function writeMatches(matches: StoredMatch[]): void {
  fs.writeFileSync(MATCHES_PATH, JSON.stringify(matches, null, 2));
}

// Replace all employer matches for a job
export function upsertMatchesForJob(jobId: string, newMatches: StoredMatch[]): void {
  const existing = readMatches().filter(
    m => !(m.type === "employer" && m.jobId === jobId)
  )
  writeMatches([...existing, ...newMatches])
}

// Replace all applicant matches for an applicant
export function upsertMatchesForApplicant(applicantId: string, newMatches: StoredMatch[]): void {
  const existing = readMatches().filter(
    m => !(m.type === "applicant" && m.applicantId === applicantId)
  )
  writeMatches([...existing, ...newMatches])
}
