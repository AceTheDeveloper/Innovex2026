import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Applicants } from "@/app/intefaces/Applicants";

const APPLICANTS_PATH = path.join(process.cwd(), "data", "applicants.json");

function readJSON<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8").trim();
  if (!content) return [];
  return JSON.parse(content);
}

function writeJSON<T>(filePath: string, data: T[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const applicants = readJSON<Applicants>(APPLICANTS_PATH);

    const existing = applicants.find((a) => a.userID === body.userId);
    if (existing) {
      return NextResponse.json(
        { error: "Applicant profile already exists" },
        { status: 400 }
      );
    }

    const newApplicant: Applicants = {
      id: body.userId,
      userID: body.userId,
      name: body.name,
      email: body.email,
      country: body.country,
      isOpenToOverseas: body.isOpenToOverseas ?? false,
      rawText: body.rawText ?? '',
      extracted: {
        skills: body.extracted?.skills ?? [],
        experienceYears: body.extracted?.experienceYears ?? null,
        education: body.extracted?.education ?? null,
        previousRoles: body.extracted?.previousRoles ?? [],
        certifications: body.extracted?.certifications ?? [],
        languages: body.extracted?.languages ?? [],
      },
      created_at: new Date().toISOString().split('T')[0],
    };

    applicants.push(newApplicant);
    writeJSON(APPLICANTS_PATH, applicants);

    return NextResponse.json({ applicant: newApplicant }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}