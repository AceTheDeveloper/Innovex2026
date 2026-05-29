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

export async function GET(
  req: NextRequest,
  { params }: { params: { applicantId: string } }
) {
  try {
    const { applicantId } = await params;

    if (!applicantId) {
      return NextResponse.json(
        { error: "applicantId is required" },
        { status: 400 }
      );
    }

    const applicants = readJSON<Applicants>(APPLICANTS_PATH);
    const applicant = applicants.find((a) => a.id === applicantId);

    if (!applicant) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ applicant }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { applicantId: string } }
) {
  try {
    const { applicantId } = await params;

    if (!applicantId) {
      return NextResponse.json(
        { error: "applicantId is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const applicants = readJSON<Applicants>(APPLICANTS_PATH);
    const index = applicants.findIndex((a) => a.id === applicantId);

    if (index === -1) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 }
      );
    }

    // merge existing with updated fields
    const updated = {
      ...applicants[index],
      ...body,
      id: applicants[index].id,         // prevent id override
      userId: applicants[index].userID,  // prevent userId override
      createdAt: applicants[index].created_at, // prevent createdAt override
    };

    applicants[index] = updated;
    writeJSON(APPLICANTS_PATH, applicants);

    return NextResponse.json({ applicant: updated }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}