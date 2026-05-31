import { View, Text } from 'react-native'

type Props = {
  currentStep: number
  totalSteps: number
}

const StepsIndicator = ({ currentStep, totalSteps }: Props) => {
  return (
    <View className="flex-row items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index + 1 === currentStep
        const isCompleted = index + 1 < currentStep
        return (
          <View
            key={index}
            className="h-1.5 rounded-full"
            style={{
              width: isActive ? 24 : 8,
              backgroundColor: isCompleted || isActive ? '#2c6bed' : '#c8d0e0',
              opacity: isCompleted ? 0.4 : 1,
            }}
          />
        )
      })}
      <Text className="font-figtree text-xs text-surface-muted ml-auto">
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  )
}

export default StepsIndicator