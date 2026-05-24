import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { Job } from "@/app/intefaces/Jobs";
import { extractText } from "unpdf";
import { extractJobData } from "@/app/lib/gemini";
import generateUUID from "@/app/helpers/generateUUID";

const JOBS_PATH = path.join(process.cwd(), "data", "jobs.json");

function readJobs(): Job[] {
  if (!fs.existsSync(JOBS_PATH)) {
    fs.writeFileSync(JOBS_PATH, "[]");
    return [];
  }

  const content = fs.readFileSync(JOBS_PATH, "utf-8").trim();
  if (!content) {
    fs.writeFileSync(JOBS_PATH, "[]");
    return [];
  }

  return JSON.parse(content);
}

function writeJobs(jobs: Job[]) {
  fs.writeFileSync(JOBS_PATH, JSON.stringify(jobs, null, 2));
}

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (file.name.endsWith(".pdf")) {
    const { text } = await extractText(new Uint8Array(buffer), {
      mergePages: true,
    });
    return text;
  }

  throw new Error("Unsupported file type. Use .pdf or .docx");
}

// MOCK ONLY WE WILL REPLACE THIS WITH CLAUDE API (I Needed your 3 accounts here mavs HAHAHAH)
function mockExtract(rawText: string): Job["extracted"] {
  return {
    requirements: ["Extracted on Day 5"],
    niceToHave: [],
    experienceYears: 0,
    skills: [],
    salaryRange: null,
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const employerId = formData.get("employerId") as string;
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const country = formData.get("country") as "PH" | "ID";
    const isOverseas = formData.get("isOverseas") === "true";
    const textInput = formData.get("text") as string | null;
    const file = formData.get("file") as File | null;

    // Validate
    // We still need to add an employer ID here soon!
    if (!title || !company || !location || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!textInput && !file) {
      return NextResponse.json(
        { error: "Provide either a text description or a file" },
        { status: 400 },
      );
    }

    // Extract raw text
    let rawText = "";
    if (file) {
      rawText = await extractTextFromFile(file);
    } else if (textInput) {
      rawText = textInput;
    }

    const newJob: Job = {
      id: generateUUID(),
      employerId,
      title,
      company,
      location,
      country,
      isOverseas,
      rawText,
      extracted: await extractJobData(rawText), // swap with Claude on Day 5
      createdAt: new Date().toISOString(),
    };

    const jobs = readJobs();
    jobs.push(newJob);
    writeJobs(jobs);

    return NextResponse.json(
      { message: "Job posted successfully", job: newJob },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const jobs = readJobs();
  return NextResponse.json(jobs);
}
