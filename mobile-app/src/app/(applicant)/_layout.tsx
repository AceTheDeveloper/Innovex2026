import { Stack } from "expo-router"
import { ProfileProvider } from "@/features/applicant/context/ProfileContext"

const EmployerLayout = () => {
  return (
    <ProfileProvider>
    <Stack>

      <Stack.Screen
        name="(tabs)"
        options={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
         }}
      />

      <Stack.Screen
        name="update/experience"
        options={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
         }}
      />

      <Stack.Screen
        name="update/education"
        options={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
         }}
      />

      <Stack.Screen
        name="update/certifications"
        options={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
         }}
      />
      
    </Stack>
  </ProfileProvider>
  )
}

export default EmployerLayout