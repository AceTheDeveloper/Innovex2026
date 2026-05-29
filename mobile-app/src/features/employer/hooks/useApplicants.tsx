import { useState, useEffect } from 'react'
import { matchApplicantsToJob } from '../api/jobApi'

const DEV_JOB_ID = 'job-001'

export function useApplicants() {
  const [applicants, setApplicants] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const fetchApplicants = async () => {
    setIsLoading(true)
    try {
      const data = await matchApplicantsToJob(DEV_JOB_ID)
      console.log(data)
      setApplicants(data.topMatches)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicants()
  }, [])

  return { applicants, isLoading, error }
}