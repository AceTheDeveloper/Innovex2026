import { useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Job } from '../../types/employment'


type RoleBasicsForm = Job['extracted']['salaryRange']

interface CompensationModalProps {
  visible: boolean
  initialData: RoleBasicsForm
  onClose: () => void
  onSave: (data: RoleBasicsForm) => void
}

const CompensationModal = ({ visible, initialData, onClose, onSave }: CompensationModalProps) => {
  const [form, setForm] = useState<RoleBasicsForm>(initialData);

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  return (
    <>

      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
          
          <KeyboardAvoidingView behavior="padding">
            <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4">

            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />
            {/* Header */}
            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">Compensation</Text>


            <ScrollView
              contentContainerClassName="pt-4 pb-4"
              keyboardShouldPersistTaps="handled"
            >
              {/* Job title */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-2">Salary range</Text>
                <View className="bg-navy-950 rounded-2xl px-4 pt-3 pb-2">
                  <Text className="font-figtree text-xs text-surface-muted mb-1 tracking-widest">AMOUNT</Text>

                  <View className="flex-row items-center gap-2">
                    <TextInput
                      className="flex-1 font-figtree-extrabold text-white text-xl"
                      placeholder="e.g. PHP 35,000 - 45,000 per month"
                      placeholderTextColor="#6B7BA0"
                      keyboardType="default"
                      value={form?.toString() ?? ''}
                      onChangeText={(val) => setForm(val)}
                    />
                  </View>
                </View>

                <View className="flex-row gap-3 mt-4 mb-4">
                  <TouchableOpacity
                    onPress={onClose}
                    className="flex-1 border border-surface-border rounded-2xl py-4 items-center"
                  >
                    <Text className="font-figtree-bold text-sm text-surface-secondary">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSave}
                    className="flex-1 bg-blue rounded-2xl py-4 items-center"
                  >
                    <Text className="font-figtree-bold text-white text-sm">Save changes</Text>
                  </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  </>
  )
}

export default CompensationModal