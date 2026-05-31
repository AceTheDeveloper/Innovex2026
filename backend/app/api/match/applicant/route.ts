import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "@/app/intefaces/Jobs";
import { Applicants } from "@/app/intefaces/Applicants";
import { matchJobsToApplicant } from "@/app/lib/gemini";
import { readMatches, writeMatches, StoredMatch, upsertMatchesForApplicant } from "@/app/lib/matchStore";

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
    const applicantId = searchParams.get("applicantId");

    console.log("MATCHES_PATH:", path.join(process.cwd(), "data", "matches.json"))
    console.log("all matches:", readMatches().length)
    console.log("cached for applicant:", readMatches().filter(m => m.type === "applicant" && m.applicantId === applicantId).length)

    // serve from cache
    const cached = readMatches().filter(
      m => m.type === "applicant" && m.applicantId === applicantId
    )
    console.log("cached matches:", cached.length)
    if (cached.length > 0) {
      return NextResponse.json({ topMatches: cached });
    }

    // cache miss — run Gemini
    const applicants = readJSON<Applicants>(APPLICANTS_PATH);
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }

    const jobs = readJSON<Job>(JOBS_PATH);
    if (jobs.length === 0) {
      return NextResponse.json({ error: "No jobs available" }, { status: 404 });
    }

    const topMatches = await matchJobsToApplicant(applicant, jobs);

    // enrich with applicantId and store
    const enriched: StoredMatch[] = topMatches.map((match: any) => ({
      ...match,
      type: "applicant" as const,
      applicantId,
      name: applicant.name,
      country: applicant.country,
      isOpenToOverseas: applicant.isOpenToOverseas,
      experienceYears: applicant.extracted?.experienceYears ?? null,
    }))

    upsertMatchesForApplicant(applicantId, enriched);

    return NextResponse.json({
      applicant: { id: applicant.id, name: applicant.name, email: applicant.email },
      totalJobs: jobs.length,
      topMatches: enriched,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}