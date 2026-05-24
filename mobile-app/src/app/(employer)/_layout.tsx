import { Stack } from "expo-router"

const EmployerLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create/entry"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create/job-form"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create/job-upload"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default EmployerLayout