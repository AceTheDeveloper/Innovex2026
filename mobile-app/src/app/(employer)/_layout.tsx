import { Stack } from "expo-router"
import { EmployerProvider } from "@/features/employer/context/EmployerProvider"

const EmployerLayout = () => {
  return (
      <EmployerProvider>
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
          name="create/entry"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F4F5F9",
            }
          }}
        />

        <Stack.Screen
          name="create/job-form"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F4F5F9",
            }
          }}
        />

        <Stack.Screen
          name="create/job-upload"
          options={{ headerShown: false }}
        />

        
        <Stack.Screen
          name="update/update-job"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F4F5F9",
            }
          }}
        />
      </Stack>
    </EmployerProvider>
  )
}

export default EmployerLayout