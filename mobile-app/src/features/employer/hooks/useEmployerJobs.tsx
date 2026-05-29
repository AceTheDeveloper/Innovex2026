  import { useState, useEffect } from "react";
  import { fetchEmployerJobs } from "@/features/employer/api/employerApi";
  import { Job } from "@/features/employer/types/employment";

  const DEV_EMPLOYER_ID = "employer-001"

  export function useEmployerJobs () {

    const [jobs, setJobs] = useState<Job[] | []>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEmployerJobs(DEV_EMPLOYER_ID);
        setJobs(data);
      } catch (error: unknown) {
        console.log(error);
        setError(error instanceof Error ? error.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    useEffect(() => {
      fetchJobs();
    }, []);

    return { jobs, error,isLoading }

  }