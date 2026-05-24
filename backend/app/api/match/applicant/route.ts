import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "@/app/intefaces/Jobs";
import { Applicants } from "@/app/intefaces/Applicants";
import { matchJobsToApplicant } from "@/app/lib/gemini";

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

    if (!applicantId) {
      return NextResponse.json(
        { error: "applicantId is required" },
        { status: 400 },
      );
    }

    const applicants = readJSON<Applicants>(APPLICANTS_PATH);
    const applicant = applicants.find((a) => a.id === applicantId);

    if (!applicant) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 },
      );
    }

    const jobs = readJSON<Job>(JOBS_PATH);

    if (jobs.length === 0) {
      return NextResponse.json({ error: "No jobs available" }, { status: 404 });
    }

    const topMatches = await matchJobsToApplicant(applicant, jobs);

    return NextResponse.json({
      applicant: {
        id: applicant.id,
        name: applicant.name,
        email: applicant.email,
      },
      totalJobs: jobs.length,
      topMatches,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
