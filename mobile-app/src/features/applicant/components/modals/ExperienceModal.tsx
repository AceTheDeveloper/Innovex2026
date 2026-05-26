import { useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown } from 'lucide-react-native'
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { Experience } from '@/features/applicant/types/applicant'

interface ExperienceModalProps {
  visible: boolean
  onClose: () => void
}

const ExperienceModal = ({ visible, onClose }: ExperienceModalProps) => {
  const [experience, setExperience] = useState<Experience>({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    duration: '',
    current: false,
  })
  const [pickerTarget, setPickerTarget] = useState<'from' | 'to' | null>(null)
  const defaultStyles = useDefaultStyles();

  const handleDateChange = ({ date }: { date: DateType }) => {
    if (!pickerTarget || !date) return
    setExperience(prev => ({
      ...prev,
      [pickerTarget]: dayjs(date as DateType).format('MMM YYYY'),
    }))
    setPickerTarget(null)
    console.log(experience);
  }

  const activeDateValue =
    pickerTarget === 'from'
      ? experience.from ? dayjs(experience.from).toDate() : undefined
      : experience.to ? dayjs(experience.to).toDate() : undefined

  const toMinDate = experience.from ? dayjs(experience.from).toDate() : undefined

  const handleSave = () => {
    onClose()
  }

  return (
    <>
      {/* Shared date picker modal */}
      <Modal
        visible={pickerTarget !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerTarget(null)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={() => setPickerTarget(null)} />
          <SafeAreaView edges={['bottom']} className="bg-white rounded-t-3xl px-5 pt-4">
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-4" />
            <Text className="font-figtree-bold text-sm text-navy-950 mb-3">
              {pickerTarget === 'from' ? 'Start date' : 'End date'}
            </Text>
            <DateTimePicker
              mode="single"
              date={activeDateValue}
              onChange={handleDateChange}
              {...(pickerTarget === 'to' && toMinDate ? { minDate: toMinDate } : {})}
              styles={defaultStyles}
            />
          </SafeAreaView>
        </View>
      </Modal>

      {/* Main modal */}
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

          <KeyboardAvoidingView behavior="padding">
            <SafeAreaView edges={['bottom']} className="bg-white rounded-t-3xl px-5 pt-4">
              {/* Handle */}
              <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />
              {/* Header */}
              <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">Add Experience</Text>

              <ScrollView
                contentContainerClassName="pt-4 pb-4"
                keyboardShouldPersistTaps="handled"
              >
                {/* Job title */}
                <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Job title</Text>
                <TextInput
                  value={experience.title}
                  onChangeText={(val) => setExperience(prev => ({ ...prev, title: val }))}
                  placeholder="e.g. Software Engineer"
                  className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                  placeholderTextColor="#6B7BA0"
                />

                {/* Company */}
                <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Company</Text>
                <TextInput
                  value={experience.company}
                  onChangeText={(val) => setExperience(prev => ({ ...prev, company: val }))}
                  placeholder="e.g. Google"
                  className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                  placeholderTextColor="#6B7BA0"
                />

                {/* Location */}
                <Text className="font-figtree-bold text-xs text-navy-950 mb-1">Location</Text>
                <TextInput
                  value={experience.location}
                  onChangeText={(val) => setExperience(prev => ({ ...prev, location: val }))}
                  placeholder="e.g. San Francisco, CA"
                  className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                  placeholderTextColor="#6B7BA0"
                />

                {/* From / To */}
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="font-figtree-bold text-xs text-navy-950 mb-1">From</Text>
                    <TouchableOpacity
                      onPress={() => setPickerTarget('from')}
                      className="bg-navy-950 rounded-2xl px-4 py-3.5 flex-row items-center justify-between"
                    >
                      <Text className="text-white font-figtree text-sm">
                        {experience.from || 'Select'}
                      </Text>
                      <ChevronDown size={16} color="#6B7BA0" />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-1">
                    <Text className="font-figtree-bold text-xs text-navy-950 mb-1">To</Text>
                    <TouchableOpacity
                      onPress={() => !experience.current && setPickerTarget('to')}
                      disabled={experience.current}
                      className={`rounded-2xl px-4 py-3.5 flex-row items-center justify-between ${
                        experience.current ? 'bg-navy-950/40' : 'bg-navy-950'
                      }`}
                    >
                      <Text className="text-white font-figtree text-sm">
                        {experience.current ? 'Present' : experience.to || 'Select'}
                      </Text>
                      <ChevronDown size={16} color="#6B7BA0" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Currently working here */}
                <View className="bg-surface-bg border border-surface-border rounded-2xl px-4 py-3 flex-row items-center mb-4">
                  <View className="flex-1">
                    <Text className="font-figtree-bold text-sm text-navy-950">Currently working here</Text>
                    <Text className="font-figtree text-xs text-surface-muted">Leave the end date blank</Text>
                  </View>
                  <Switch
                    value={experience.current}
                    onValueChange={(val) =>
                      setExperience(prev => ({ ...prev, current: val, ...(val ? { to: '' } : {}) }))
                    }
                    trackColor={{ false: '#E4E8F2', true: '#4A7BE0' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

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

export default ExperienceModal