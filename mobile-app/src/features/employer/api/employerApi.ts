import api from "@/utils/api";

export const fetchEmployerJobs = async (employerId: string) => {

  const { data } = await api.get(`/api/jobs?employerId=${employerId}`);
  console.log(data);
  return data.jobs;

}