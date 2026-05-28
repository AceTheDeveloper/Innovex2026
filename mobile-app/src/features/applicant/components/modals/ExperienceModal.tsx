import { useState, useEffect } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown } from 'lucide-react-native'
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'

// ─── Local form shape (UI only — not sent to backend as-is) ──────────────────
interface ExperienceForm {
  title: string
  company: string
  location: string
  from: string
  to: string
  current: boolean
}

export const EMPTY_FORM: ExperienceForm = {
  title: '',
  company: '',
  location: '',
  from: '',
  to: '',
  current: false,
}

interface ExperienceModalProps {
  visible: boolean
  onClose: () => void
  onSave: (title: string) => void  // ← only title goes to backend
  initialData?: ExperienceForm     // optional: pre-fill for edit mode
}

const ExperienceModal = ({ visible, onClose, onSave, initialData }: ExperienceModalProps) => {
  console.log(visible);
  const isEditMode = !!initialData
  const [form, setForm] = useState<ExperienceForm>(initialData ?? EMPTY_FORM)
  const [pickerTarget, setPickerTarget] = useState<'from' | 'to' | null>(null)
  const defaultStyles = useDefaultStyles()

  // ── Sync form when modal opens or initialData changes ─────────────────────
  useEffect(() => {
    if (visible) setForm(initialData ?? EMPTY_FORM)
  }, [visible, initialData])

  const handleDateChange = ({ date }: { date: DateType }) => {
    if (!pickerTarget || !date) return
    setForm(prev => ({
      ...prev,
      [pickerTarget]: dayjs(date as DateType).format('MMM YYYY'),
    }))
    setPickerTarget(null)
  }

  const activeDateValue =
    pickerTarget === 'from'
      ? form.from ? dayjs(form.from).toDate() : undefined
      : form.to   ? dayjs(form.to).toDate()   : undefined

  const toMinDate = form.from ? dayjs(form.from).toDate() : undefined

  const handleSave = () => {
    if (!form.title.trim()) return  // title is required
    onSave(form.title.trim())       // ← only send title to backend
    onClose()
  }

  return (
  <>
    {/* Date picker modal */}
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
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />

            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">
              {isEditMode ? 'Edit Experience' : 'Add Experience'}
            </Text>

            <Text className="font-figtree text-xs text-surface-muted mb-1">
              Only the job title is used for AI matching.
            </Text>

            <ScrollView
              contentContainerClassName="pt-4 pb-4"
              keyboardShouldPersistTaps="handled"
            >
              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Job title <Text className="text-alert">*</Text>
              </Text>
              <TextInput
                value={form.title}
                onChangeText={(val) => setForm(prev => ({ ...prev, title: val }))}
                placeholder="e.g. ICU Nurse, Staff Nurse..."
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
                autoFocus
              />

              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Company <Text className="font-figtree text-surface-muted">(optional)</Text>
              </Text>
              <TextInput
                value={form.company}
                onChangeText={(val) => setForm(prev => ({ ...prev, company: val }))}
                placeholder="e.g. Makati Medical Center"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />

              <Text className="font-figtree-bold text-xs text-navy-950 mb-1">
                Location <Text className="font-figtree text-surface-muted">(optional)</Text>
              </Text>
              <TextInput
                value={form.location}
                onChangeText={(val) => setForm(prev => ({ ...prev, location: val }))}
                placeholder="e.g. Makati, Philippines"
                className="bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-3.5 mb-4"
                placeholderTextColor="#6B7BA0"
              />

              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="font-figtree-bold text-xs text-navy-950 mb-1">From</Text>
                  <TouchableOpacity
                    onPress={() => setPickerTarget('from')}
                    className="bg-navy-950 rounded-2xl px-4 py-3.5 flex-row items-center justify-between"
                  >
                    <Text className="text-white font-figtree text-sm">
                      {form.from || 'Select'}
                    </Text>
                    <ChevronDown size={16} color="#6B7BA0" />
                  </TouchableOpacity>
                </View>

                <View className="flex-1">
                  <Text className="font-figtree-bold text-xs text-navy-950 mb-1">To</Text>
                  <TouchableOpacity
                    onPress={() => !form.current && setPickerTarget('to')}
                    disabled={form.current}
                    className={`rounded-2xl px-4 py-3.5 flex-row items-center justify-between ${
                      form.current ? 'bg-navy-950/40' : 'bg-navy-950'
                    }`}
                  >
                    <Text className="text-white font-figtree text-sm">
                      {form.current ? 'Present' : form.to || 'Select'}
                    </Text>
                    <ChevronDown size={16} color="#6B7BA0" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="bg-surface-bg border border-surface-border rounded-2xl px-4 py-3 flex-row items-center mb-6">
                <View className="flex-1">
                  <Text className="font-figtree-bold text-sm text-navy-950">Currently working here</Text>
                  <Text className="font-figtree text-xs text-surface-muted">Leave the end date blank</Text>
                </View>
                <Switch
                  value={form.current}
                  onValueChange={(val) =>
                    setForm(prev => ({ ...prev, current: val, ...(val ? { to: '' } : {}) }))
                  }
                  trackColor={{ false: '#E4E8F2', true: '#4A7BE0' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View className="flex-row gap-3 mb-4">
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 border border-surface-border rounded-2xl py-4 items-center"
                >
                  <Text className="font-figtree-bold text-sm text-surface-secondary">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  disabled={!form.title.trim()}
                  className={`flex-1 rounded-2xl py-4 items-center ${
                    form.title.trim() ? 'bg-blue' : 'bg-surface-border'
                  }`}
                >
                  <Text className={`font-figtree-bold text-sm ${
                    form.title.trim() ? 'text-white' : 'text-surface-muted'
                  }`}>
                    {isEditMode ? 'Save changes' : 'Add experience'}
                  </Text>
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