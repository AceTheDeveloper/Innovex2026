import api from "@/utils/api";

export const login = async ({ email, password }: { email: string, password: string }) => {

  try {

    const response = await api.post("/api/login", { email, password });
    return response;

  } catch (e: unknown) {
    console.log(e);
  }

}