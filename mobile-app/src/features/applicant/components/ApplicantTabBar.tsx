import { View, Text, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { Home, Search, Send, UserCircle, Sparkles } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TABS = [
  { name: "home",   label: "FEED",    Icon: Home       },
  { name: "search",  label: "SEARCH",  Icon: Search     },
  { name: "applied", label: "APPLIED", Icon: Send       },
  { name: "profile", label: "PROFILE", Icon: UserCircle },
];

export default function ApplicantTabBar({
  state,
  navigation,
  insets,          
}: BottomTabBarProps) {
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
        {TABS.slice(0, 2).map(({ name, label, Icon }) => {
          const isActive = activeRouteName === name;
          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              className="items-center gap-1 min-w-[44px]"
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

        {/* AI FAB */}
        <TouchableOpacity
          // onPress={() => router.push("/(candidate)/ai-assistant")}
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
          <Sparkles size={20} color="#fff" strokeWidth={2} />
        </TouchableOpacity>

        {TABS.slice(2).map(({ name, label, Icon }) => {
          const isActive = activeRouteName === name;
          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              className="items-center gap-1 min-w-[44px]"
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