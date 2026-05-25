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
    <View className="flex-row items-center mt-4">
      {STEPS.map((step, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <View key={stepNumber} className="flex-row items-center flex-1">
            {/* Step circle + label */}
            <View className="items-center flex-1">
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  isActive ? 'bg-white' : 'bg-navy-700'
                }`}
              >
                <Text
                  className={`text-sm ${
                    isActive ? 'text-navy-950 font-figtree-extrabold' : 'text-surface-muted font-figtree-bold'
                  }`}
                >
                  {stepNumber}
                </Text>
              </View>
              <Text
                className={`text-xs mt-1 ${
                  isActive ? 'text-white font-figtree-bold' : 'text-surface-muted font-figtree'
                }`}
              >
                {step.label}
              </Text>
            </View>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <View className="flex-1 h-px bg-navy-700 mb-4" />
            )}
          </View>
        )
      })}
    </View>
  )
}

export default StepIndicator