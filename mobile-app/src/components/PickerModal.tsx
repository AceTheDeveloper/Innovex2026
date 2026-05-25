import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Check } from 'lucide-react-native'

export interface PickerOption {
  value: string
  label: string
  description?: string
}

interface PickerModalProps {
  visible: boolean
  title: string
  options: PickerOption[]
  selected: string | null
  onClose: () => void
  onSelect: (value: string) => void
}

const PickerModal = ({ visible, title, options, selected, onClose, onSelect }: PickerModalProps) => {

  const handleSelect = (value: string) => {
    onSelect(value)
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4">
          <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-4" />

          <Text className="font-figtree-extrabold text-xl text-navy-950 mb-4">{title}</Text>

          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => {
              const isSelected = selected === item.value
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value)}
                  className={`flex-row items-center py-3.5 gap-3 ${
                    index < options.length - 1 ? 'border-b border-surface-border' : ''
                  }`}
                >
                  <View className="flex-1">
                    <Text className={`font-figtree-bold text-sm ${isSelected ? 'text-blue' : 'text-navy-950'}`}>
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text className="font-figtree text-xs text-surface-muted">{item.description}</Text>
                    )}
                  </View>
                  {isSelected && <Check size={16} color="#4A7BE0" />}
                </TouchableOpacity>
              )
            }}
          />
        </SafeAreaView>
      </View>
    </Modal>
  )
}

export default PickerModal