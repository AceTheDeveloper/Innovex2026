import { useState, useEffect } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Job } from '../../types/employment'


type RoleBasicsForm = Pick<Job, 'title' | 'company' | 'location' | 'country' | 'isOverseas'>

interface RoleBasicsModalProps {
  visible: boolean
  initialData: RoleBasicsForm
  onClose: () => void
  onSave: (data: RoleBasicsForm) => void
}

const RoleBasicsModal = ({ visible, initialData, onClose, onSave }: RoleBasicsModalProps) => {
  const [form, setForm] = useState<RoleBasicsForm>(initialData);


  useEffect(() => {
    if (visible) setForm(initialData)
  }, [visible])

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
            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">Role Basics</Text>


            <ScrollView
              contentContainerClassName="pt-4 pb-4"
              keyboardShouldPersistTaps="handled"
            >
              {/* Job title */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Job title</Text>
              <TextInput
                value={form.title}
                onChangeText={(val) => setForm(prev => ({ ...prev, title: val }))}
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />

              {/* Company */}
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Company</Text>
              <TextInput
                value={form.company}
                onChangeText={(val) => setForm(prev => ({ ...prev, company: val }))}
                autoCapitalize="none"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />
              
              <View className='flex-row gap-2'>
                <View className='flex-1'>
                  <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Location</Text>
                  <TextInput
                    value={form.location}
                    onChangeText={(val) => setForm(prev => ({ ...prev, location: val }))}
                    autoCapitalize="characters"
                    className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                    placeholderTextColor="#6B7BA0"
                  />
                </View>

                <View className='flex-1'>
                  <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Country</Text>
                  <TextInput
                    value={form.country}
                    onChangeText={(val) => setForm(prev => ({ ...prev, country: val }))}  
                    autoCapitalize="characters"
                    className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                    placeholderTextColor="#6B7BA0"
                  />
                </View>
              </View>

              {/* Open to overseas */}
              <View className="bg-surface-bg border border-surface-border rounded-2xl px-4 py-3 flex-row items-center mb-4">
                <View className="flex-1">
                  <Text className="font-figtree-bold text-sm text-navy-950">Open to overseas jobs</Text>
                  <Text className="font-figtree text-xs text-surface-muted">Accept applicants from outside the country</Text>  
                </View>
                <Switch
                  value={form.isOverseas}
                  onValueChange={(val) => setForm(prev => ({ ...prev, isOverseas: val }))}
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

export default RoleBasicsModal