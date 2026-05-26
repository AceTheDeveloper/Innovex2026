import { Tabs } from "expo-router";
import ApplicantTabBar from "@/features/applicant/components/ApplicantTabBar";

export default function ApplicantLayout() {
  return (
    <Tabs
      tabBar={(props) => <ApplicantTabBar {...props as any} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home"   options={{ title: "Feed"    }} />
      <Tabs.Screen name="search"  options={{ title: "Search"  }} />
      <Tabs.Screen name="applied" options={{ title: "Applied" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}