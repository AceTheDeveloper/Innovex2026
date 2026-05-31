import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Job } from '@/app/intefaces/Jobs'
import { Applicants } from '@/app/intefaces/Applicants'
import { matchApplicantsToJob } from '@/app/lib/gemini'
import { upsertMatchesForJob } from '@/app/lib/matchStore'

const JOBS_PATH = path.join(process.cwd(), 'data', 'jobs.json')
const APPLICANTS_PATH = path.join(process.cwd(), 'data', 'applicants.json')

function readJSON<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) return []
  const content = fs.readFileSync(filePath, 'utf-8').trim()
  if (!content) return []
  return JSON.parse(content)
}

export async function POST(req: NextRequest) {
  try {
    const { jobId } = await req.json()
    if (!jobId) return NextResponse.json({ error: 'jobId is required' }, { status: 400 })

    const jobs = readJSON<Job>(JOBS_PATH)
    const job = jobs.find(j => j.id === jobId)
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

    const applicants = readJSON<Applicants>(APPLICANTS_PATH)
    if (applicants.length === 0) return NextResponse.json({ error: 'No applicants found' }, { status: 404 })

    let filtered = applicants
    if (job.isOverseas) {
      filtered = applicants.filter(a => a.isOpenToOverseas === true)
    }

    const topMatches = await matchApplicantsToJob(job, filtered)

    const enriched = topMatches.map(match => {
      const applicant = applicants.find(a => a.id === match.applicantId)
      return {
        ...match,
        jobId: job.id,
        country: applicant?.country ?? null,
        isOpenToOverseas: applicant?.isOpenToOverseas ?? false,
        experienceYears: applicant?.extracted?.experienceYears ?? null,
      }
    })

    upsertMatchesForJob(jobId, enriched)

    return NextResponse.json({ topMatches: enriched })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}