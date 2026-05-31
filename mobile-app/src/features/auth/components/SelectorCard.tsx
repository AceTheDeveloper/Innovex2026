import { useRef } from "react"
import { View, Text, Animated, Pressable } from "react-native"
import { ChevronRight } from "lucide-react-native"

const SelectorCard = ({
  value,
  title,
  description,
  icon,
  selected,
  onPress,
  activeColor = '#4A7BE0',
  activeBg = '#EBF0FB',
}: {
  value: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number, color?: string }>
  selected: boolean
  onPress: () => void
  activeColor?: string
  activeBg?: string
}) => {
  const borderColor = selected ? activeColor : '#E2E8F0'
  const iconBg = selected ? activeColor : activeBg
  const iconColor = selected ? '#FFFFFF' : activeColor
  const Icon = icon

  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 4 }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }).start()
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 16,
          borderWidth: 1,
          borderColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View style={{ position: 'absolute', top: 32, right: 16 }}>
          <ChevronRight size={20} color={activeColor} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginVertical: 12, paddingRight: 32 }}>
          <View style={{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: iconBg }}>
            <Icon size={20} color={iconColor} />
          </View>
          <View style={{ flex: 1 }}>
            <Text className="font-figtree-bold text-lg text-navy-950 mb-0.5">{title}</Text>
            <Text className="font-figtree text-sm text-surface-secondary leading-relaxed">{description}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default SelectorCard