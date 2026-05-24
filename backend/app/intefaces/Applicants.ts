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
