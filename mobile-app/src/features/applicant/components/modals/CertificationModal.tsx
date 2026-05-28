import { useState, useEffect } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CertificationForm {
  name: string
  issuer: string
  year: string
}

const EMPTY_FORM: CertificationForm = {
  name: '',
  issuer: '',
  year: '',
}

interface CertificationModalProps {
  visible: boolean
  onClose: () => void
  onSave: (value: string) => void
  initialData?: string | null
}

const CertificationModal = ({ visible, onClose, onSave, initialData }: CertificationModalProps) => {
  const isEditMode = !!initialData
  const [form, setForm] = useState<CertificationForm>(EMPTY_FORM)

  useEffect(() => {
    if (visible) {
      if (initialData) {
        // e.g. "AWS Certified Solutions Architect · Amazon Web Services · 2024"
        const parts = initialData.split(' · ')
        setForm({
          name: parts[0]?.trim() ?? '',
          issuer: parts[1]?.trim() ?? '',
          year: parts[2]?.trim() ?? '',
        })
      } else {
        setForm(EMPTY_FORM)
      }
    }
  }, [visible, initialData])

  const handleSave = () => {
    if (!form.name.trim()) return
    const parts = [form.name.trim(), form.issuer.trim(), form.year.trim()].filter(Boolean)
    onSave(parts.join(' · '))
    onClose()
  }

  const isValid = form.name.trim().length > 0

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        <KeyboardAvoidingView behavior="padding">
          <SafeAreaView edges={['bottom']} className="bg-white rounded-t-3xl px-5 pt-4">
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />
            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">
              {isEditMode ? 'Edit Certification' : 'Add Certification'}
            </Text>
            <Text className="font-figtree text-xs text-surface-muted mb-1">
              Only the certification name is used for AI matching.
            </Text>

            <ScrollView
              contentContainerClassName="pt-4 pb-4"
              keyboardShouldPersistTaps="handled"
            >
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Certification name <Text className="text-alert">*</Text>
              </Text>
              <TextInput
                value={form.name}
                onChangeText={(val) => setForm(prev => ({ ...prev, name: val }))}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
                autoFocus
              />

              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Issuing body <Text className="font-figtree text-surface-muted">(optional)</Text>
              </Text>
              <TextInput
                value={form.issuer}
                onChangeText={(val) => setForm(prev => ({ ...prev, issuer: val }))}
                placeholder="e.g. Amazon Web Services"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />

              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Year <Text className="font-figtree text-surface-muted">(optional)</Text>
              </Text>
              <TextInput
                value={form.year}
                onChangeText={(val) => setForm(prev => ({ ...prev, year: val }))}
                placeholder="e.g. 2024"
                keyboardType="numeric"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-6"
                placeholderTextColor="#6B7BA0"
              />

              <View className="flex-row gap-3 mb-4">
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 border border-surface-border rounded-2xl py-4 items-center"
                >
                  <Text className="font-figtree-bold text-sm text-surface-secondary">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  disabled={!isValid}
                  className={`flex-1 rounded-2xl py-4 items-center ${isValid ? 'bg-blue' : 'bg-surface-border'}`}
                >
                  <Text className={`font-figtree-bold text-sm ${isValid ? 'text-white' : 'text-surface-muted'}`}>
                    {isEditMode ? 'Save changes' : 'Add certification'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

export default CertificationModal