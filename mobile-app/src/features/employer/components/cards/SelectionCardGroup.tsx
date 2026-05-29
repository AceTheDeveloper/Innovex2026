import { View, Text } from "react-native";
import { Check, Asterisk } from "lucide-react-native";
import Card from "@/components/Card";

// ─── Types ────────────────────────────────────────────────────────────────────

type PillVariant = "blue" | "green" | "purple" | "amber" | "red";

export interface SelectionCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  pill?: { label: string; variant: PillVariant };
  disabled?: boolean;
}

interface SelectionCardProps extends SelectionCardOption {
  selected: boolean;
  onPress: (value: string) => void;
  size?: "sm" | "md" | "lg";
  layout?: "icon-top" | "icon-left";  // icon-top = stacked, icon-left = row
}

interface SelectionCardGroupProps {
  icon: React.ReactNode;
  groupLabel: string;
  options: SelectionCardOption[];
  selected: string | null | undefined;
  onChange: (value: string) => void;
  columns?: 1 | 2;
  size?: "sm" | "md" | "lg";
  layout?: "icon-top" | "icon-left";
}

// ─── Pill ─────────────────────────────────────────────────────────────────────

const pillStyles: Record<PillVariant, { bg: string; text: string }> = {
  blue:   { bg: "bg-blue-pale",  text: "text-[#185FA5]" },
  green:  { bg: "bg-success-bg", text: "text-success-dark" },
  purple: { bg: "bg-ai-light",   text: "text-ai-dark" },
  amber:  { bg: "bg-warning-bg", text: "text-warning-dark" },
  red:    { bg: "bg-alert-bg",   text: "text-alert" },
};

function Pill({ label, variant }: { label: string; variant: PillVariant }) {
  const { bg, text } = pillStyles[variant];
  return (
    <View className={`${bg} rounded-full px-2 py-0.5 self-start`}>
      <Text className={`${text} text-2xs font-figtree-bold tracking-wide`}>
        {label}
      </Text>
    </View>
  );
}

// ─── Checkmark ────────────────────────────────────────────────────────────────

function Checkmark() {
  return (
    <View className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue items-center justify-center">
      <Check size={10} strokeWidth={3} color={"#FFFFFF"} />
    </View>
  );
}

// ─── SelectionCard ────────────────────────────────────────────────────────────

export function SelectionCard({
  value,
  label,
  description,
  icon,
  pill,
  selected,
  disabled = false,
  onPress,
  size = "md",
  layout = "icon-top",
}: SelectionCardProps) {
  return (
    <Card
      variant="default"
      size={size}
      active={selected}
      disabled={disabled}
      onPress={() => !disabled && onPress(value)}
      className="relative flex-1"
    >
      {/* Checkmark when selected */}
      {selected && <Checkmark />}

      {layout === "icon-top" ? (
        // ── Stacked layout (icon above text) ──
        <View className="pr-4">
          {icon && (
            <View
              className={`w-8 h-8 rounded-lg items-center justify-center mb-2 ${
                selected ? "bg-white" : "bg-surface-bg"
              }`}
            >
              {icon}
            </View>
          )}

          {/* Selection dot when no icon */}
          {!icon && (
            <View
              className={`w-2 h-2 rounded-full mb-2 ${
                selected ? "bg-blue" : "bg-surface-border"
              }`}
            />
          )}

          <Text
            className={`font-figtree-bold text-sm mb-0.5 ${
              selected ? "text-blue" : "text-navy-950"
            }`}
          >
            {label}
          </Text>

          {description && (
            <Text
              className={`font-figtree text-xs leading-snug ${
                selected ? "text-[#3D6AC0]" : "text-surface-muted"
              }`}
            >
              {description}
            </Text>
          )}

          {pill && (
            <View className="mt-2">
              <Pill {...pill} />
            </View>
          )}
        </View>
      ) : (
        // ── Row layout (icon left of text) ──
        <View className="flex-row items-center gap-3 pr-6">
          {icon && (
            <View
              className={`w-9 h-9 rounded-xl items-center justify-center flex-shrink-0 ${
                selected ? "bg-white" : "bg-surface-bg"
              }`}
            >
              {icon}
            </View>
          )}

          <View className="flex-1">
            <Text
              className={`font-figtree-bold text-sm ${
                selected ? "text-blue" : "text-navy-950"
              }`}
            >
              {label}
            </Text>

            {description && (
              <Text
                className={`font-figtree text-xs leading-snug mt-0.5 ${
                  selected ? "text-[#3D6AC0]" : "text-surface-muted"
                }`}
              >
                {description}
              </Text>
            )}

            {pill && (
              <View className="mt-1">
                <Pill {...pill} />
              </View>
            )}
          </View>
        </View>
      )}
    </Card>
  );
}

// ─── SelectionCardGroup ───────────────────────────────────────────────────────

export default function SelectionCardGroup({
  icon,
  groupLabel,
  options,
  selected,
  onChange,
  columns = 2,
  size = "md",
  layout = "icon-top",
}: SelectionCardGroupProps) {
  return (
    <View className="my-2">
      <View className='flex-row items-center gap-2 mb-2'>
        {icon}
        <Text className='font-figtree-medium'>
          {groupLabel} <Asterisk size={10} color={"#E8526A"} />
        </Text>
      </View>
      <View
        className={`flex-row flex-wrap gap-2`}
      >
        {options.map((option) => (
          <View
            key={option.value}
            style={{ width: columns === 1 ? "100%" : "48%" }}
          >
            <SelectionCard
              {...option}
              selected={selected === option.value}
              onPress={onChange}
              size={size}
              layout={layout}
            />
          </View>
        ))}
      </View>
    </View>
  );
}