import { useState, useEffect } from "react";
import { Job } from "../types/employment";
import { updateJob, matchApplicantsToJob } from "../api/jobApi";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useSaveJob(originalJob: Job | null) {
  const [jobForm, setJobForm] = useState<Job | null>(originalJob);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  // remove topMatches state

  useEffect(() => {
    setJobForm(originalJob);
    setIsDirty(false);
  }, [originalJob?.id]);

  const handleSave = async () => {
    if (!jobForm) return;
    setSaveStatus("saving");
    try {
      await updateJob(jobForm);
      // remove matchApplicantsToJob call
      setSaveStatus("saved");
      setIsDirty(false);
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("error");
    }
  };

  const handleDiscard = () => {
    setJobForm(originalJob);
    setIsDirty(false);
    setSaveStatus("idle");
  };

  const updateForm = (data: Partial<Job>) => {
    if (!jobForm) return;
    setJobForm(prev => prev ? { ...prev, ...data } : prev);
    setIsDirty(true);
  };

  const updateExtracted = (data: Partial<Job['extracted']>) => {
    if (!jobForm) return;
    setJobForm(prev => prev ? { ...prev, extracted: { ...prev.extracted, ...data } } : prev);
    setIsDirty(true);
  };

  return {
    jobForm,
    setJobForm,
    isDirty,
    setIsDirty,
    saveStatus,
    handleSave,
    handleDiscard,
    updateForm,
    updateExtracted,
  };
}