import { useState, useEffect } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface EducationForm {
  degree: string
  school: string
  year: string
}

const EMPTY_FORM: EducationForm = {
  degree: '',
  school: '',
  year: '',
}

interface EducationModalProps {
  visible: boolean
  onClose: () => void
  onSave: (value: string) => void  // sends "Degree, School Year" as a string
  initialData?: string | null            // e.g. "BS Information Technology, University of Iloilo 2021"
}

const EducationModal = ({ visible, onClose, onSave, initialData }: EducationModalProps) => {
  const isEditMode = !!initialData
  const [form, setForm] = useState<EducationForm>(EMPTY_FORM)

  // Parse the string back into form fields when opening in edit mode
  useEffect(() => {
    if (visible) {
      if (initialData) {
        // e.g. "BS Information Technology, University of Iloilo 2021"
        const lastSpaceIdx = initialData.lastIndexOf(' ')
        const year = initialData.slice(lastSpaceIdx + 1)
        const rest = initialData.slice(0, lastSpaceIdx)           // "BS Information Technology, University of Iloilo"
        const commaIdx = rest.indexOf(',')
        const degree = rest.slice(0, commaIdx).trim()
        const school = rest.slice(commaIdx + 1).trim()
        setForm({ degree, school, year })
      } else {
        setForm(EMPTY_FORM)
      }
    }
  }, [visible, initialData])

  const handleSave = () => {
    if (!form.degree.trim()) return
    onSave(`${form.degree.trim()}, ${form.school.trim()} ${form.year.trim()}`)
    onClose()
  }

  const isValid = form.degree.trim().length > 0

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        <KeyboardAvoidingView behavior="padding">
          <SafeAreaView edges={['bottom']} className="bg-white rounded-t-3xl px-5 pt-4">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />

            {/* Header */}
            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">
              {isEditMode ? 'Edit Education' : 'Add Education'}
            </Text>
            <Text className="font-figtree text-xs text-surface-muted mb-1">
              Only the degree is used for AI matching.
            </Text>

            <ScrollView
              contentContainerClassName="pt-4 pb-4"
              keyboardShouldPersistTaps="handled"
            >
              {/* Degree */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Degree / Course <Text className="text-alert">*</Text>
              </Text>
              <TextInput
                value={form.degree}
                onChangeText={(val) => setForm(prev => ({ ...prev, degree: val }))}
                placeholder="e.g. BS Information Technology"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
                autoFocus
              />

              {/* School */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                School / Institution <Text className="font-figtree text-surface-muted">(optional)</Text>
              </Text>
              <TextInput
                value={form.school}
                onChangeText={(val) => setForm(prev => ({ ...prev, school: val }))}
                placeholder="e.g. University of Iloilo"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />

              {/* Year */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Year Graduated <Text className="font-figtree text-surface-muted">(optional)</Text>
              </Text>
              <TextInput
                value={form.year}
                onChangeText={(val) => setForm(prev => ({ ...prev, year: val }))}
                placeholder="e.g. 2021"
                keyboardType="numeric"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-6"
                placeholderTextColor="#6B7BA0"
              />

              {/* Actions */}
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
                  className={`flex-1 rounded-2xl py-4 items-center ${
                    isValid ? 'bg-blue' : 'bg-surface-border'
                  }`}
                >
                  <Text className={`font-figtree-bold text-sm ${
                    isValid ? 'text-white' : 'text-surface-muted'
                  }`}>
                    {isEditMode ? 'Save changes' : 'Add education'}
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

export default EducationModal