import { createContext, useContext, useState, ReactNode } from 'react'
import { matchApplicantsToJob } from '../api/jobApi'
import { fetchMatchesForJob as apiFetchMatches, refreshMatchesForJob as apiRefreshMatches } from '../api/matchApi'

interface Match {
  applicantId: string
  name: string
  matchScore: number
  reason: string
  gaps: string[]
  country: string
  isOpenToOverseas: boolean
  experienceYears: number | null
  jobId: string  // add this
}

interface MatchContextType {
  topMatches: Match[]
  isMatching: boolean
  matchError: string
  fetchMatchesForJob: (jobId: string) => Promise<void>  // replaces fetchAllMatches
  refreshJobMatches: (jobId: string) => Promise<void>
}

const MatchContext = createContext<MatchContextType | null>(null)

export function MatchProvider({ children }: { children: ReactNode }) {
  const [topMatches, setTopMatches] = useState<Match[]>([])
  const [fetchedJobIds, setFetchedJobIds] = useState<Set<string>>(new Set())
  const [isMatching, setIsMatching] = useState(false)
  const [matchError, setMatchError] = useState('')

  const fetchMatchesForJob = async (jobId: string) => {
    if (fetchedJobIds.has(jobId)) return
    setIsMatching(true)
    setMatchError('')
    try {
      const data = await apiFetchMatches(jobId)
      setTopMatches(prev => [...prev, ...data.topMatches])
      setFetchedJobIds(prev => new Set(prev).add(jobId))
    } catch (err: unknown) {
      setMatchError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsMatching(false)
    }
  }

  const refreshJobMatches = async (jobId: string) => {
    setIsMatching(true)
    setMatchError('')
    try {
      const data = await apiRefreshMatches(jobId)
      setTopMatches(prev => [
        ...prev.filter(m => m.jobId !== jobId),
        ...data.topMatches
      ])
      setFetchedJobIds(prev => new Set(prev).add(jobId))
    } catch (err: unknown) {
      setMatchError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsMatching(false)
    }
  }

  return (
    <MatchContext.Provider value={{ topMatches, isMatching, matchError, fetchMatchesForJob, refreshJobMatches }}>
      {children}
    </MatchContext.Provider>
  )
}

export function useMatchContext() {
  const ctx = useContext(MatchContext)
  if (!ctx) throw new Error('useMatchContext must be used within MatchProvider')
  return ctx
}