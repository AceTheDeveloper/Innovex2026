import { useEffect } from 'react';
import { useFonts, Figtree_400Regular, Figtree_500Medium, Figtree_700Bold, Figtree_800ExtraBold } from '@expo-google-fonts/figtree'
import { Stack, SplashScreen } from "expo-router";
import "../global.css";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_700Bold,
    Figtree_800ExtraBold,
  });

  useEffect(() => {
      if (fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
        }}
      />

      <Stack.Screen
        name="(employer)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
        }}
      />

      <Stack.Screen
        name="(applicant)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F5F9",
          }
        }}
      />

    </Stack>);
}
