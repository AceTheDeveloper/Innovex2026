// features/applicant/components/SaveBar.tsx
// ─── Persistent save bar — appears when profile has unsaved changes ────────────

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Save, Check, AlertCircle } from "lucide-react-native";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SaveBarProps {
  isDirty: boolean;
  saveStatus: SaveStatus;
  onSave: () => void;
}

export default function SaveBar({ isDirty, saveStatus, onSave }: SaveBarProps) {
  // Nothing to show when clean and idle
  if (!isDirty && saveStatus === "idle") return null;

  const configs = {
    idle: {
      bg: "bg-navy-950",
      title: "You have unsaved changes",
      sub: "Saves profile + refreshes AI matches",
      showButton: true,
    },
    saving: {
      bg: "bg-navy-800",
      title: "Saving your profile…",
      sub: "Refreshing AI matches after save",
      showButton: false,
    },
    saved: {
      bg: "bg-[#0F4A35]",
      title: "Profile saved!",
      sub: "AI matches refreshed successfully",
      showButton: false,
    },
    error: {
      bg: "bg-alert",
      title: "Failed to save",
      sub: "Please check your connection and try again",
      showButton: true,
    },
  };

  const config = configs[saveStatus];

  return (
    <View className="px-4 pb-4 pt-2 bg-white border-t border-surface-border">
      <View className={`${config.bg} rounded-xl px-4 py-3 flex-row items-center justify-between`}>
        <View className="flex-1 mr-3">
          <Text className={`font-figtree-bold text-sm ${saveStatus === "saved" ? "text-success" : saveStatus === "error" ? "text-white" : "text-white"}`}>
            {config.title}
          </Text>
          <Text className={`font-figtree text-xs mt-0.5 ${saveStatus === "saved" ? "text-[#5FAD8A]" : "text-navy-400"}`}>
            {config.sub}
          </Text>
        </View>

        {saveStatus === "saving" && (
          <ActivityIndicator size="small" color="#6FBFFF" />
        )}

        {saveStatus === "saved" && (
          <View className="w-9 h-9 rounded-full bg-success items-center justify-center">
            <Check size={18} color="#fff" strokeWidth={2.5} />
          </View>
        )}

        {saveStatus === "error" && (
          <View className="w-9 h-9 rounded-full bg-white items-center justify-center">
            <AlertCircle size={18} color="#E8526A" />
          </View>
        )}

        {config.showButton && (
          <TouchableOpacity
            onPress={onSave}
            className="bg-blue rounded-xl px-4 py-2 flex-row items-center gap-2"
            activeOpacity={0.8}
          >
            <Save size={14} color="#fff" strokeWidth={2.5} />
            <Text className="font-figtree-bold text-sm text-white">Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}