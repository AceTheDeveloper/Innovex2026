import api from '@/utils/api'

export const fetchMatchesForJob = async (jobId: string) => {
  const { data } = await api.get(`/api/match/employer?jobId=${jobId}`)
  return data
}

export const refreshMatchesForJob = async (jobId: string) => {
  const { data } = await api.post(`/api/match/refresh`, { jobId })
  return data
}