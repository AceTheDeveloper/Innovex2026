import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { extractText } from "unpdf";
import { Applicants } from "@/app/intefaces/Applicants";
import { extractResumeData } from "@/app/lib/gemini";

const APPLICANTS_PATH = path.join(process.cwd(), "data", "applicants.json");

function readApplicants(): Applicants[] {
  if (!fs.existsSync(APPLICANTS_PATH)) {
    fs.writeFileSync(APPLICANTS_PATH, "[]");
    return [];
  }
  const content = fs.readFileSync(APPLICANTS_PATH, "utf-8").trim();
  if (!content) {
    fs.writeFileSync(APPLICANTS_PATH, "[]");
    return [];
  }
  return JSON.parse(content);
}

function writeApplicants(applicants: Applicants[]) {
  fs.writeFileSync(APPLICANTS_PATH, JSON.stringify(applicants, null, 2));
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

// Mock — replace with Claude on Day 5
function mockExtract(rawText: string): Applicants["extracted"] {
  return {
    skills: ["Extracted on Day 5"],
    experienceYears: 0,
    education: "",
    previousRoles: [],
    certifications: [],
    languages: [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const userID = formData.get("userID") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const country = formData.get("country") as "PH" | "ID";
    const isOpenToOverseas = formData.get("isOpenToOverseas") === "true";
    const file = formData.get("file") as File | null;
    const textInput = formData.get("text") as string | null;

    if (!userID || !name || !email || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!file && !textInput) {
      return NextResponse.json(
        { error: "Provide either a resume file or text" },
        { status: 400 },
      );
    }

    let rawText = "";
    if (file) {
      rawText = await extractTextFromFile(file);
    } else if (textInput) {
      rawText = textInput;
    }

    // Check if applicant already submitted a resume — update instead of duplicate
    const applicants = readApplicants();
    const existingIndex = applicants.findIndex((a) => a.userID === userID);

    const applicantData: Applicants = {
      id: existingIndex >= 0 ? applicants[existingIndex].id : uuidv4(),
      userID,
      name,
      email,
      country,
      isOpenToOverseas,
      rawText,
      extracted: await extractResumeData(rawText),
      created_at: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      applicants[existingIndex] = applicantData; // update existing
    } else {
      applicants.push(applicantData); // new entry
    }

    writeApplicants(applicants);

    return NextResponse.json(
      { message: "Resume uploaded successfully", applicant: applicantData },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const applicants = readApplicants();
  return NextResponse.json(applicants);
}
