// features/employer/components/JobSaveBar.tsx

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Save, Check, AlertCircle } from "lucide-react-native";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface JobSaveBarProps {
  isDirty: boolean;
  saveStatus: SaveStatus;
  onSave: () => void;
  onDiscard: () => void;
}

export default function JobSaveBar({ isDirty, saveStatus, onSave, onDiscard }: JobSaveBarProps) {
  if (!isDirty && saveStatus === "idle") return null;

  const configs = {
    idle: {
      bg: "bg-navy-950",
      title: "You have unsaved changes",
      sub: "Changes won't apply until you save",
      showButtons: true,
    },
    saving: {
      bg: "bg-navy-800",
      title: "Saving changes…",
      sub: "Updating your job posting",
      showButtons: false,
    },
    saved: {
      bg: "bg-[#0F4A35]",
      title: "Job posting saved!",
      sub: "Your changes are now live",
      showButtons: false,
    },
    error: {
      bg: "bg-alert",
      title: "Failed to save",
      sub: "Please check your connection and try again",
      showButtons: true,
    },
  };

  const config = configs[saveStatus];

  return (
    <SafeAreaView
      className="absolute bottom-8 left-4 right-4 "
    >
      <View className={`${config.bg} rounded-2xl px-4 py-3 flex-row items-center justify-between`}>
        <View className="flex-1 mr-3">
          <Text className="font-figtree-bold text-sm text-white">{config.title}</Text>
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

        {config.showButtons && (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={onDiscard}
              className="border border-navy-700 rounded-xl px-3 py-2"
              activeOpacity={0.7}
            >
              <Text className="font-figtree-bold text-xs text-navy-400">Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              className="bg-blue rounded-xl px-4 py-2 flex-row items-center gap-1.5"
              activeOpacity={0.8}
            >
              <Save size={14} color="#fff" strokeWidth={2.5} />
              <Text className="font-figtree-bold text-sm text-white">Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}