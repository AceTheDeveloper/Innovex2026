import { useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Certification } from '@/features/applicant/types/applicant'

interface CertificationModalProps {
  visible: boolean
  onClose: () => void
}

const CertificationModal = ({ visible, onClose }: CertificationModalProps) => {
  const [certification, setCertification] = useState<Certification>({
    name: '',
    issuer: '',
    year: ''
  })

  const handleSave = () => {
    onClose()
  }

  return (
    <>
      {/* Main modal */}
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

          <KeyboardAvoidingView behavior="padding">
            <SafeAreaView edges={['bottom']} className="bg-white rounded-t-3xl px-5 pt-4">
              {/* Handle */}
              <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />
              {/* Header */}
              <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">Add Certification</Text>

              <ScrollView
                contentContainerClassName="pt-4 pb-4"
                keyboardShouldPersistTaps="handled"
              >
                {/* Name */}
                <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Certification Name</Text>
                <TextInput
                  value={certification.name}
                  onChangeText={(val) => setCertification(prev => ({ ...prev, name: val }))}
                  placeholder="e.g. BS Information Technology"
                  className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                  placeholderTextColor="#6B7BA0"
                />

                {/* Issuer */}
                <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Issuing body</Text>
                <TextInput
                  value={certification.issuer}
                  onChangeText={(val) => setCertification(prev => ({ ...prev, issuer: val }))}
                  placeholder="e.g. University of Iloilo"
                  className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                  placeholderTextColor="#6B7BA0"
                />

                {/* Issue date */}
                <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Issue Date</Text>
                <TextInput
                  value={certification.year}
                  onChangeText={(val) => setCertification(prev => ({ ...prev, year: val }))}
                  placeholder="e.g. 2021"
                  className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                  placeholderTextColor="#6B7BA0"
                />

                {/* Actions */}
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

export default CertificationModal