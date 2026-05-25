import { View, Text } from 'react-native'

const STEPS = [
  { label: 'Basics' },
  { label: 'Details' },
  { label: 'Comp' },
  { label: 'Publish' },
]

interface StepIndicatorProps {
  currentStep: number
}
const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <View className="mt-4">
      {/* Circles + connectors */}
      <View className="flex-row items-center px-5">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isLast = index === STEPS.length - 1

          return (
            <>
              {/* Circle */}
              <View
                key={stepNumber}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isActive || isCompleted ? 'bg-white' : 'bg-navy-700'
                }`}
              >
                <Text className={`text-sm ${
                  isActive || isCompleted ? 'text-navy-950 font-figtree-extrabold' : 'text-surface-muted font-figtree-bold'
                }`}>
                  {stepNumber}
                </Text>
              </View>

              {/* Connector */}
              {!isLast && (
                <View className="flex-1 h-px" style={{ backgroundColor: isCompleted ? '#FFFFFF' : '#243F82' }} />
              )}
            </>
          )
        })}
      </View>

      {/* Labels */}
      <View className="flex-row mt-1 px-1">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          return (
            <View key={index} className="flex-1 items-center">
              <Text className={`text-xs ${isActive ? 'text-white font-figtree-bold' : 'text-surface-muted font-figtree'}`}>
                {step.label}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default StepIndicator