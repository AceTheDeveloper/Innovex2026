// ─── Employment Type ──────────────────────────────────────────────────────────

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship";

export interface EmploymentTypeOption {
  value: EmploymentType;
  label: string;
  description: string;
}

export const EMPLOYMENT_TYPE_OPTIONS: EmploymentTypeOption[] = [
  {
    value: "full-time",
    label: "Full-time",
    description: "Regular hours, ongoing role",
  },
  {
    value: "part-time",
    label: "Part-time",
    description: "Fewer hours, flexible schedule",
  },
  {
    value: "contract",
    label: "Contract",
    description: "Fixed duration or project-based",
  },
  {
    value: "internship",
    label: "Internship",
    description: "Training role, usually short-term",
  },
];

// ─── Experience Level ─────────────────────────────────────────────────────────

export type ExperienceLevel =
  | "none"
  | "1-2"
  | "3-5"
  | "5-10"
  | "10+";

export interface ExperienceLevelOption {
  value: ExperienceLevel;
  label: string;
  description: string;
}

export const EXPERIENCE_LEVEL_OPTIONS: ExperienceLevelOption[] = [
  {
    value: "none",
    label: "No experience required",
    description: "Open to complete beginners",
  },
  {
    value: "1-2",
    label: "1 – 2 years",
    description: "Some hands-on experience",
  },
  {
    value: "3-5",
    label: "3 – 5 years",
    description: "Independently capable",
  },
  {
    value: "5-10",
    label: "5 – 10 years",
    description: "Strong background in the field",
  },
  {
    value: "10+",
    label: "10+ years",
    description: "Deep expertise & leadership",
  },
];

// ─── Job Form — Step 1 state ──────────────────────────────────────────────────

export interface RoleBasicsForm {
  jobTitle: string;
  department: string;
  employmentType: EmploymentType | null;
  isRemote: boolean;
  city: string;
  country: string;
  experienceLevel: ExperienceLevel | null;
}

export const ROLE_BASICS_INITIAL_STATE: RoleBasicsForm = {
  jobTitle: "",
  department: "",
  employmentType: null,
  isRemote: false,
  city: "",
  country: "",
  experienceLevel: null,
};

export interface JobDetailsForm {
  description: string
  responsibilities: string[]
}

export const JOB_DETAILS_INITIAL_STATE: JobDetailsForm = {
  description: '',
  responsibilities: [],
}

export type SalaryType = "fixed" | "range" | "negotiable" | "internship"

export const SALARY_TYPE_OPTIONS = [
  { value: "fixed", label: "Fixed", description: "Set a single salary amount" },
  { value: "range", label: "Range", description: "Provide a min and max salary" },
  { value: "negotiable", label: "Negotiable", description: "Open to discussion" },
  { value: "internship", label: "Intern", description: "Internship or unpaid role" },
]

export type PayPeriod = "monthly" | "annually" | "hourly" | "daily"

export const PAY_PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly", description: "Paid once a month" },
  { value: "annually", label: "Annually", description: "Paid once a year" },
  { value: "hourly", label: "Hourly", description: "Paid per hour worked" },
  { value: "daily", label: "Daily", description: "Paid per day worked" },
]

export type RequiredDocument = "resume" | "cover_letter" | "certifications" | "portfolio"

export const REQUIRED_DOCUMENT_OPTIONS = [
  { value: "resume", label: "Resume / CV", description: "Standard application requirement", icon: "file", defaultRequired: true },
  { value: "cover_letter", label: "Cover Letter", description: "Why they want this role", icon: "mail", defaultRequired: false },
  { value: "certifications", label: "Certifications", description: "BLS, ACLS, or license copies", icon: "badge", defaultRequired: true },
  { value: "portfolio", label: "Portfolio", description: "Work samples or case studies", icon: "grid", defaultRequired: false },
]

export type EducationRequirement =
  | "no_requirement"
  | "high_school"
  | "associate"
  | "bachelor"
  | "master"
  | "doctorate"
  | "vocational"

export const EDUCATION_OPTIONS = [
  { value: "no_requirement", label: "No requirement", description: "Open to all education levels" },
  { value: "high_school", label: "High school diploma", description: "or equivalent" },
  { value: "vocational", label: "Vocational / Technical", description: "Trade school or certificate program" },
  { value: "associate", label: "Associate degree", description: "2-year college degree" },
  { value: "bachelor", label: "Bachelor's degree", description: "4-year college degree" },
  { value: "master", label: "Master's degree", description: "Graduate level education" },
  { value: "doctorate", label: "Doctorate / PhD", description: "Doctoral level education" },
]

export const CURRENCY_OPTIONS = [
  { value: "PHP", label: "PHP", description: "Philippine Peso" },
  { value: "USD", label: "USD", description: "US Dollar" },
  { value: "EUR", label: "EUR", description: "Euro" },
  { value: "GBP", label: "GBP", description: "British Pound" },
  { value: "AUD", label: "AUD", description: "Australian Dollar" },
  { value: "CAD", label: "CAD", description: "Canadian Dollar" },
  { value: "SGD", label: "SGD", description: "Singapore Dollar" },
  { value: "JPY", label: "JPY", description: "Japanese Yen" },
  { value: "CNY", label: "CNY", description: "Chinese Yuan" },
  { value: "INR", label: "INR", description: "Indian Rupee" },
  { value: "MYR", label: "MYR", description: "Malaysian Ringgit" },
  { value: "IDR", label: "IDR", description: "Indonesian Rupiah" },
  { value: "AED", label: "AED", description: "UAE Dirham" },
  { value: "SAR", label: "SAR", description: "Saudi Riyal" },
  { value: "HKD", label: "HKD", description: "Hong Kong Dollar" },
]

// src/features/employer/types/employment.ts

export interface JobPostingForm {
  // Step 1
  company: string
  jobTitle: string
  department: string
  employmentType: EmploymentType | null
  isRemote: boolean
  city: string
  country: "PH" | "ID"
  // Step 2
  description: string
  responsibilities: string[]
  skills: string[]
  experienceLevel: string | number | null
  educationRequirement: string | null
  // Step 3
  salaryType: SalaryType | null
  salaryMin: number | null
  salaryMax: number | null
  currency: string
  payPeriod: string | null
  perks: string[]
  // Step 4
  screeningQuestions: string[]
  requiredDocuments: RequiredDocument[]
  visibility: string | null
  applicationDeadline: string | null
}

export const JOB_FORM_INITIAL_STATE: JobPostingForm = {
  company: 'Bold Hub',
  jobTitle: '',
  department: '',
  employmentType: null,
  isRemote: false,
  city: '',
  country: "PH",
  description: '',
  responsibilities: [],
  skills: [],
  experienceLevel: null,
  educationRequirement: null,
  salaryType: null,
  salaryMin: null,
  salaryMax: null,
  currency: '',
  payPeriod: null,
  perks: [],
  screeningQuestions: [],
  requiredDocuments: [],
  visibility: null,
  applicationDeadline: null,
}

// app/interfaces/Jobs.ts

export interface JobExtracted {
  requirements: string[]
  niceToHave: string[]
  experienceYears: number | null
  skills: string[]
  salaryRange: string | null
}

export interface Job {
  id: string
  employerId: string
  title: string
  company: string
  reason: string
  location: string
  country: string
  matchScore?: number | null 
  isOverseas: boolean
  rawText: string
  extracted: JobExtracted
  createdAt: string
}

export interface MatchedJob {
  jobId: string
  title: string
  company: string
  matchScore: number
  reason: string
  gaps: string[]
  // merged from Job
  location: string | null
  country: string | null
  isOverseas: boolean
  extracted: JobExtracted | null
}