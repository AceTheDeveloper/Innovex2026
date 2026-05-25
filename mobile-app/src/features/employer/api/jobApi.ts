import axios from 'axios'
import { JobPostingForm } from '@/features/employer/types/employment'
import { multipartClient } from '@/utils/api'

export const createJobPosting = async (form: JobPostingForm, employerId: string) => {
  try {
    const formData = new FormData()

    formData.append('employerId', 'emp-001')
    formData.append('title', form.jobTitle)
    formData.append('company', 'Bold Hub') // replace with employer profile later
    formData.append('city', form.city)
    formData.append('country', form.country)
    formData.append('isOverseas', String(false))
    formData.append('text',  'aylabyu')

    const response = await multipartClient.post("/api/jobs", formData)

    return response.data

  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('API error:', err.response?.status, err.response?.data)
      throw new Error(err.response?.data?.error || 'Failed to post job')
    }
    throw err
  }
}