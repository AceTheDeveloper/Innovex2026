import { Stack } from "expo-router"

const EmployerLayout = () => {
  return (
    <Stack>
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
    </Stack>
  )
}

export default EmployerLayout