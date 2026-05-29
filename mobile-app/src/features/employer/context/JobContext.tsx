import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Job } from '../types/employment'
import { useSaveJob } from '../hooks/useSaveJob'
import { useEmployerJobs } from '../hooks/useEmployerJobs'
import { useMatchContext } from './MatchContext'

interface JobContextType {
  jobs: Job[]
  isLoading: boolean
  error: string
  selectedJob: Job | null          // was: Job
  jobForm: Job | null              // was: Job
  setSelectedJob: (job: Job) => void
  setJobForm: (job: Job | null | ((prev: Job | null) => Job | null)) => void  // was: Job
  isDirty: boolean
  setIsDirty: (val: boolean) => void
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  handleSelectJob: (job: Job) => void
  handleSave: () => void
  handleDiscard: () => void
  updateForm: (data: Partial<Job>) => void
  updateExtracted: (data: Partial<Job['extracted']>) => void
}

const JobContext = createContext<JobContextType | null>(null)

export function JobProvider({ children }: { children: ReactNode }) {
  const { jobs, isLoading, error } = useEmployerJobs()
  const { fetchMatchesForJob } = useMatchContext()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const saveJob = useSaveJob(selectedJob)

  useEffect(() => {
    if (jobs.length > 0 && selectedJob === null) {
      setSelectedJob(jobs[0])
    }
  }, [jobs])

  // Fetch all matches once jobs load
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job)
    fetchMatchesForJob(job.id)
  }

  useEffect(() => {
    if (saveJob.saveStatus === 'saved' && saveJob.jobForm) {
      setSelectedJob(saveJob.jobForm)
    }
  }, [saveJob.saveStatus])


  return (
    <JobContext.Provider value={{ jobs, isLoading, error, selectedJob, setSelectedJob, handleSelectJob,...saveJob }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJobContext() {
  const ctx = useContext(JobContext)
  if (!ctx) throw new Error('useJobContext must be used within JobProvider')
  return ctx
}