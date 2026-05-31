export interface Applicants {
  id: string;
  userID: string;
  name: string;
  email: string;
  country: "PH" | "ID";
  isOpenToOverseas: boolean;
  rawText: string;
  extracted: ApplicantExtracted | null;
  created_at: string;
}

export interface ApplicantExtracted {
  skills: string[];
  experienceYears: number;
  education: string;
  previousRoles: string[];
  certifications: string[];
  languages: string[];
}

export interface ApplicantMatch {
  applicantId: string
  jobId: string
  title: string
  company: string
  matchScore: number
  reason: string
  gaps: string[]
}