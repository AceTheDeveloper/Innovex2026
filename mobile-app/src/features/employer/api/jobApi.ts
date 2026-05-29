import axios from 'axios'
import { Job, JobPostingForm } from '@/features/employer/types/employment'
import  api  from '@/utils/api'

export const createJobPosting = async (form: JobPostingForm, employerId: string) => {
  try {
    const formData = new FormData()

    formData.append('employerId', 'emp-001')
    formData.append('title', form.jobTitle)
    formData.append('company', 'Bold Hub') // replace with employer profile later
    formData.append('location', [form.city, form.country].filter(Boolean).join(', '))
    formData.append('country', form.country)
    formData.append('isOverseas', String(false))
    formData.append('text',  form.description)

    const response = await api.post("/api/jobs", formData, { headers: { "Content-Type" : "multipart/form-data" } })

    return response.data

  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('API error:', err.response?.status, err.response?.data)
      throw new Error(err.response?.data?.error || 'Failed to post job')
    }
    throw err
  }
}

export const updateJob = async (job: Job) => {

  const { data } = await api.patch(`/api/jobs?id=${job.id}`, { job });
  console.log(data);
  return data;

} 

export async function matchApplicantsToJob(jobId: string) {
  const response = await api.get(`/api/match/employer?jobId=${jobId}`)
  return response.data
}