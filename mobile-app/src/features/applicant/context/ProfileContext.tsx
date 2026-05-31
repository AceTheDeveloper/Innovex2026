// features/applicant/context/ProfileContext.tsx
// ─── Global profile state — backend is source of truth ───────────────────────

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ApplicantProfileForm, APPLICANT_PROFILE_INITIAL_STATE } from "@/features/applicant/types/applicant";
import { Job } from "@/features/employer/types/employment";
import { fetchProfile, updateProfile, refreshMatches } from "@/features/applicant/api/profileApi";

// ─── Types ────────────────────────────────────────────────────────────────────

const DEV_PROFILE_ID = "profile-001";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface ProfileContextValue {
  profile: ApplicantProfileForm;
  setProfile: React.Dispatch<React.SetStateAction<ApplicantProfileForm>>;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  saveStatus: SaveStatus;
  isLoading: boolean;
  error: string | null;
  matchedJobs: Job[];
  isMatching: boolean;       
  saveProfile: () => Promise<void>;
  refetchProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ProfileContext = createContext<ProfileContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ApplicantProfileForm>(APPLICANT_PROFILE_INITIAL_STATE);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch profile on mount ─────────────────────────────────────────────────
  const refetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProfile(DEV_PROFILE_ID);
      setProfile(data);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      console.error("fetchProfile error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchProfile();
  }, [refetchProfile]);

  // ── Save profile + trigger match refresh ───────────────────────────────────
  const saveProfile = useCallback(async () => {
    try {
      setSaveStatus("saving");
      setError(null);

      // 1. Save profile
      const updated = await updateProfile(DEV_PROFILE_ID, profile);
      setProfile(updated);
      setSaveStatus("saved");
      setIsDirty(false);
      setTimeout(() => setSaveStatus("idle"), 3000);

      // 2. Trigger match refresh separately (non-blocking)
      setIsMatching(true);
      const { topMatches } = await refreshMatches(DEV_PROFILE_ID);
      setMatchedJobs(topMatches);          // ← feed reads from here

    } catch (err) {
      setSaveStatus("error");
      setError("Failed to save. Please try again.");
      console.error("saveProfile error:", err);
    } finally {
      setIsMatching(false);
    }
  }, [profile]);

  const fetchMatches = useCallback(async () => {
    try {
      setIsMatching(true)
      const { topMatches } = await refreshMatches(DEV_PROFILE_ID)
      setMatchedJobs(topMatches)
    } catch (err) {
      console.error("fetchMatches error:", err)
    } finally {
      setIsMatching(false)
    }
  }, [])

  useEffect(() => {
    refetchProfile()
    fetchMatches()
  }, [refetchProfile, fetchMatches])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isDirty,
        setIsDirty,
        saveStatus,
        isLoading,
        error,
        matchedJobs,
        isMatching,
        saveProfile,
        refetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}