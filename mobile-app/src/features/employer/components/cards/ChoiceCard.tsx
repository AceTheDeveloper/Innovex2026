import { View, Text, TouchableOpacity } from "react-native";
import { ArrowRight } from "lucide-react-native";

type PillVariant = "blue" | "green" | "purple" | "amber";

interface Pill {
  label: string;
  variant: PillVariant;
}

interface ChoiceCardProps {
  title: string;
  description: string;
  pills: Pill[];
  recommended?: boolean;
  icon: React.ReactNode;
  onPress?: () => void;
}

const pillStyles: Record<PillVariant, { container: string; text: string }> = {
  blue:   { container: "bg-blue-pale",  text: "text-[#185FA5]" },
  green:  { container: "bg-success-bg", text: "text-success-dark" },
  purple: { container: "bg-ai-light",   text: "text-ai-dark" },
  amber:  { container: "bg-warning-bg", text: "text-warning-dark" },
};

function Pill({ label, variant }: Pill) {
  const { container, text } = pillStyles[variant];
  return (
    <View className={`${container} rounded-sm px-2 py-0.5`}>
      <Text className={`${text} text-xs font-figtree-medium`}>{label}</Text>
    </View>
  );
}

export default function ChoiceCard({
  title,
  description,
  pills,
  recommended = false,
  icon,
  onPress,
}: ChoiceCardProps) {
  return (
    // Outer wrapper gives space for the floating badge to overflow above
    <View>

      {/* ── Floating RECOMMENDED badge ── */}
      {recommended && (
        <View
          className="absolute -top-3 right-4 z-10 bg-blue px-3 py-1 rounded-full"
          style={{ elevation: 4 }}
        >
          <Text className="text-white text-2xs font-figtree-bold tracking-wider">
            RECOMMENDED
          </Text>
        </View>
      )}

      {/* ── Card ── */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="bg-white rounded-3xl p-4 border border-surface-border"
      >

        {/* Arrow — top right inside card */}
        <View
          className={`absolute top-4 right-4 w-7 h-7 rounded-full items-center justify-center ${
            recommended ? "bg-blue-pale" : "bg-navy-900"
          }`}
        >
          <ArrowRight size={14} color={recommended ? "#4A7BE0" : "#6FBFFF"} />
        </View>

        {/* Icon + text */}
        <View className="flex-row items-start gap-3 mb-3 pr-8">
          <View
            className={`w-11 h-11 rounded-xl items-center justify-center flex-shrink-0 ${
              recommended ? "bg-blue-pale" : "bg-navy-950"
            }`}
          >
            {icon}
          </View>

          <View className="flex-1">
            <Text className="font-figtree-bold text-lg text-navy-950 mb-0.5">
              {title}
            </Text>
            <Text className="font-figtree text-sm text-surface-secondary leading-relaxed">
              {description}
            </Text>
          </View>
        </View>

        {/* Pills */}
        <View className="flex-row flex-wrap gap-1.5">
          {pills.map((pill) => (
            <Pill key={pill.label} {...pill} />
          ))}
        </View>

      </TouchableOpacity>
    </View>
  );
}