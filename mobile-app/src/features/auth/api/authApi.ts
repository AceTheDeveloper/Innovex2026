import api from "@/utils/api";

export const login = async ({ email, password }: { email: string, password: string }) => {

  try {

    const response = await api.post("/api/login", { email, password });
    return response;

  } catch (e: unknown) {
    console.log(e);
  }

}

export const registerUser = async ({ name, email, password, role, country }: { 
    name: string, email: string, password: string, 
    role: 'applicant' | 'employer' | null, country: 'PH' | 'ID' | null
  }) => {

  try {

    const response = await api.post("/api/register", { name, email, password, role, country });
    return response;

  } catch (e: unknown) {
    console.log(e);
  }

}