import { useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown } from 'lucide-react-native'
import { ApplicantProfileForm } from '@/features/applicant/types/applicant'
import CityPickerModal from '@/components/modals/CityPickerModal'


type PersonalInfoForm = Pick<ApplicantProfileForm, 'name' | 'email' | 'country' | 'isOpenToOverseas'>

interface PersonalInfoModalProps {
  visible: boolean
  initialData: PersonalInfoForm
  onClose: () => void
  onSave: (data: PersonalInfoForm) => void
}

const PersonalInfoModal = ({ visible, initialData, onClose, onSave }: PersonalInfoModalProps) => {
  const [form, setForm] = useState<PersonalInfoForm>(initialData);
  const [cityPickerVisible, setCityPickerVisible] = useState(false);

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  return (
    <>
      <CityPickerModal
        visible={cityPickerVisible}
        onClose={() => setCityPickerVisible(false)}
        onSelect={(city, countryCode) => setForm(prev => ({ ...prev, city, country: countryCode }))}
      />

      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
          
          <KeyboardAvoidingView behavior="padding">
            <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4">

            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />
            {/* Header */}
            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">Personal Info</Text>


            <ScrollView
              contentContainerClassName="pt-4 pb-4"
              keyboardShouldPersistTaps="handled"
            >
              {/* Full name */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Full name</Text>
              <TextInput
                value={form.name}
                onChangeText={(val) => setForm(prev => ({ ...prev, name: val }))}
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />

              {/* Email */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Email</Text>
              <TextInput
                value={form.email}
                onChangeText={(val) => setForm(prev => ({ ...prev, email: val }))}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />


              {/* Open to overseas */}
              <View className="bg-surface-bg border border-surface-border rounded-2xl px-4 py-3 flex-row items-center mb-4">
                <View className="flex-1">
                  <Text className="font-figtree-bold text-sm text-navy-950">Open to overseas jobs</Text>
                  <Text className="font-figtree text-xs text-surface-muted">Show your profile to overseas employers</Text>
                </View>
                <Switch
                  value={form.isOpenToOverseas}
                  onValueChange={(val) => setForm(prev => ({ ...prev, isOpenToOverseas: val }))}
                  trackColor={{ false: "#E4E8F2", true: "#4A7BE0" }}
                  thumbColor="#FFFFFF"
                />
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

export default PersonalInfoModal