import { TouchableOpacity, View, ViewStyle } from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardVariant = "default" | "outlined" | "filled" | "ghost";
type CardSize   = "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: CardVariant;
  size?: CardSize;
  active?: boolean;         // highlighted/active border state
  disabled?: boolean;
  style?: ViewStyle;
  className?: string;
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<CardVariant, { base: string; active: string }> = {
  default:  {
    base:   "bg-white border border-surface-border",
    active: "bg-blue-pale border-2 border-blue",
  },
  outlined: {
    base:   "bg-transparent border border-surface-border",
    active: "bg-transparent border-2 border-blue",
  },
  filled:   {
    base:   "bg-surface-bg border border-transparent",
    active: "bg-blue-pale border border-blue",
  },
  ghost:    {
    base:   "bg-transparent border border-transparent",
    active: "bg-blue-pale border border-transparent",
  },
};

const sizeStyles: Record<CardSize, string> = {
  sm: "rounded-xl p-2.5",
  md: "rounded-2xl p-3.5",
  lg: "rounded-3xl p-4",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function Card({
  children,
  onPress,
  variant  = "default",
  size     = "md",
  active   = false,
  disabled = false,
  style,
  className = "",
}: CardProps) {
  const variantClass = active
    ? variantStyles[variant].active
    : variantStyles[variant].base;

  const sizeClass = sizeStyles[size];

  const opacityClass = disabled ? "opacity-50" : "";

  // If onPress is provided, render as touchable
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={style}
        className={`${variantClass} ${sizeClass} ${opacityClass} ${className}`}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={style}
      className={`${variantClass} ${sizeClass} ${opacityClass} ${className}`}
    >
      {children}
    </View>
  );
}