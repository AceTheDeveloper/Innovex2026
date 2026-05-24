export interface Job {
  id: string;
  employerId: string;
  title: string;
  company: string;
  location: string;
  country: "PH" | "ID";
  isOverseas: boolean;
  rawText: string;
  extracted: JobExtracted | null;
  createdAt: string;
}

export interface JobExtracted {
  requirements: string[];
  niceToHave: string[];
  experienceYears: number;
  skills: string[];
  salaryRange: string | null;
}
