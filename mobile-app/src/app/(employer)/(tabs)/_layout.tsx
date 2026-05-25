import { Tabs } from "expo-router";
import EmployerTabBar from "@/features/employer/components/EmployerTabBar";

export default function EmployerLayout() {
  return (
    <Tabs
      tabBar={(props) => <EmployerTabBar {...(props as any)} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index"      options={{ title: "Home"       }} />
      <Tabs.Screen name="posts"      options={{ title: "Posts"      }} />
      <Tabs.Screen name="applicants" options={{ title: "Applicants" }} />
      <Tabs.Screen name="profile"    options={{ title: "Profile"    }} />
    </Tabs>
  );
}