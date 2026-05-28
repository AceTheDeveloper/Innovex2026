// features/applicant/api/profileApi.ts
// ─── All profile-related API calls ───────────────────────────────────────────

import api from "@/utils/api";
import { ApplicantProfileForm } from "@/features/applicant/types/applicant";

// ── Fetch profile ─────────────────────────────────────────────────────────────
export async function fetchProfile(applicantId: string): Promise<ApplicantProfileForm> {
  const { data } = await api.get(`/api/applicants/${applicantId}`);
  console.log(data);
  return data.applicant;
}

// ── Update profile ────────────────────────────────────────────────────────────
export async function updateProfile(
  applicantId: string,
  profile: Partial<ApplicantProfileForm>
): Promise<ApplicantProfileForm> {
  const { data } = await api.patch(`/api/applicants/${applicantId}`, profile);
  console.log()
  return data.applicant;
}

// ── Trigger AI match refresh ──────────────────────────────────────────────────
export async function refreshMatches(applicantId: string) {
  const { data } = await api.get(`/api/match/applicant?applicantId=${applicantId}`);
  return data;
}

// ── Upload resume ─────────────────────────────────────────────────────────────
export async function uploadResume(applicantId: string, file: FormData) {
  const { data } = await api.post(`/api/profile/${applicantId}/resume`, file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}