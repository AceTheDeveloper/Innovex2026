import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "@/app/intefaces/Jobs";
import { Applicants } from "@/app/intefaces/Applicants";
import { matchApplicantsToJob } from "@/app/lib/gemini";
import { readMatches, upsertMatchesForJob, StoredMatch } from "@/app/lib/matchStore";

const JOBS_PATH = path.join(process.cwd(), "data", "jobs.json");
const APPLICANTS_PATH = path.join(process.cwd(), "data", "applicants.json");

function readJSON<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8").trim();
  if (!content) return [];
  return JSON.parse(content);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    // serve from cache
    const cached = readMatches().filter(
      m => m.type === "employer" && m.jobId === jobId
    );
    if (cached.length > 0) {
      return NextResponse.json({ topMatches: cached });
    }

    // cache miss — run Gemini
    const jobs = readJSON<Job>(JOBS_PATH);
    const job = jobs.find((j) => j.id === jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const applicants = readJSON<Applicants>(APPLICANTS_PATH);
    if (applicants.length === 0) {
      return NextResponse.json({ error: "No applicants found" }, { status: 404 });
    }

    let filteredApplicants = applicants;
    if (job.isOverseas) {
      filteredApplicants = applicants.filter((a) => a.isOpenToOverseas === true);
    }

    const topMatches = await matchApplicantsToJob(job, filteredApplicants);

   const enriched: StoredMatch[] = topMatches.map((match) => {
    const applicant = applicants.find(a => a.id === match.applicantId)
    return {
      ...match,
      type: "employer" as const,
      jobId: job.id,
      title: job.title,
      company: job.company,
      name: applicant?.name ?? '',
      country: applicant?.country ?? null,
      isOpenToOverseas: applicant?.isOpenToOverseas ?? false,
      experienceYears: applicant?.extracted?.experienceYears ?? null,
    }
  })

    upsertMatchesForJob(jobId, enriched);

    return NextResponse.json({
      job: { id: job.id, title: job.title, company: job.company },
      totalApplicants: applicants.length,
      topMatches: enriched,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}