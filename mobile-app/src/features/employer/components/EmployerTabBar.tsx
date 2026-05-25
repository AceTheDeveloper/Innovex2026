import { View, Text, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import {
  Home,
  Briefcase,
  Users,
  UserCircle,
  Plus,
} from "lucide-react-native";

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { name: "home",      label: "HOME",       Icon: Home      },
  { name: "posts",      label: "POSTS",      Icon: Briefcase },
  { name: "applicants", label: "APPLICANTS", Icon: Users      },
  { name: "profile",    label: "PROFILE",    Icon: UserCircle },
];

// ─── EmployerTabBar ───────────────────────────────────────────────────────────

export default function EmployerTabBar({ state, navigation, descriptors, insets }: BottomTabBarProps) {
  
  const router = useRouter();

  const activeRouteName = state.routes[state.index].name;

  return (
    <SafeAreaView edges={["bottom"]} className="bg-white border-t border-surface-border">
      <View
        className="flex-row items-center justify-around"
        style={{
          paddingTop: 12,
          paddingHorizontal: 8,
          paddingBottom: 8,
        }}
      >
        {/* Left two tabs */}
        {TABS.slice(0, 2).map(({ name, label, Icon }) => {
          const isActive = activeRouteName === name;
          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              className="items-center justify-center gap-1 min-w-[44px]"
              activeOpacity={0.7}
            >
              <Icon
                size={18}
                color={isActive ? "#243F82" : "#9BA8C0"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <Text
                className={`text-2xs font-figtree-bold tracking-wider ${
                  isActive ? "text-navy-700" : "text-surface-muted"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* FAB — center, not a tab */}
        <TouchableOpacity
          onPress={() => router.push("/(employer)/create/entry")}
          activeOpacity={0.85}
          className="bg-blue w-12 h-12 rounded-full items-center justify-center"
          style={{
            marginTop: -30,
            shadowColor: "#4A7BE0",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Plus size={22} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Right two tabs */}
        {TABS.slice(2).map(({ name, label, Icon }) => {
          const isActive = activeRouteName === name;
          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              className="items-center justify-center gap-1 min-w-[44px]"
              activeOpacity={0.7}
            >
              <Icon
                size={22}
                color={isActive ? "#243F82" : "#9BA8C0"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <Text
                className={`text-2xs font-figtree-bold tracking-wider ${
                  isActive ? "text-navy-700" : "text-surface-muted"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}