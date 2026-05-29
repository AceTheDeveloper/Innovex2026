import { ReactNode } from 'react'
import { Job } from '../types/employment'
import { JobProvider } from './JobContext'
import { MatchProvider } from './MatchContext'

export function EmployerProvider({ children }: { children: ReactNode}) {
  return (
    <MatchProvider>
      <JobProvider>
        {children}
      </JobProvider>
    </MatchProvider>
  )
}