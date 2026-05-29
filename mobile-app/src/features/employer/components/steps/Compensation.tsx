import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DollarSign, Coins, MoveHorizontal, MessageSquareMore, GraduationCap, Globe, ChevronDown, Banknote, Clock } from 'lucide-react-native'
import PickerModal from '@/components/modals/PickerModal'
import SelectionCardGroup from '@/features/employer/components/cards/SelectionCardGroup'
import { JobPostingForm, SalaryType, SALARY_TYPE_OPTIONS, PayPeriod, PAY_PERIOD_OPTIONS, CURRENCY_OPTIONS } from '../../types/employment'

interface CompensationProps {
  form: JobPostingForm
  setForm: React.Dispatch<React.SetStateAction<JobPostingForm>>
  onNext: () => void
  onBack: () => void
}

const ICON_COLOR = (selected: boolean) => selected ? "#4A7BE0" : "#9BA8C0"

const Compensation = ({ form, setForm, onNext, onBack }: CompensationProps) => {

  const [currencyPickerVisible, setCurrencyPickerVisible] = useState<boolean>(false);

  const salaryOptions = SALARY_TYPE_OPTIONS.map((opt) => ({
    ...opt,
    icon: {
      "fixed":      <Coins size={16} color={ICON_COLOR(form.salaryType === opt.value)} />,
      "range":      <MoveHorizontal size={16} color={ICON_COLOR(form.salaryType === opt.value)} />,
      "negotiable": <MessageSquareMore size={16} color={ICON_COLOR(form.salaryType === opt.value)} />,
      "internship": <GraduationCap size={16} color={ICON_COLOR(form.salaryType === opt.value)} />,
    }[opt.value],
  }))

  const salaryPreview = () => {
    if (!form.salaryType) return null
    if (form.salaryType === 'negotiable') return 'Negotiable'
    if (form.salaryType === 'internship') return 'Internship / Unpaid'
    if (!form.salaryMin) return null
    const currency = form.currency || 'USD'
    const amount = form.salaryType === 'range' && form.salaryMax
      ? `${currency} ${form.salaryMin.toLocaleString()} – ${form.salaryMax.toLocaleString()}`
      : `${currency} ${form.salaryMin.toLocaleString()}`
    const period = form.payPeriod ? `per ${form.payPeriod}` : ''
    const type = form.salaryType ? `· ${form.salaryType}` : ''
    return { amount, period, type }
  }

  const preview = salaryPreview()

  return (
    <>
      <PickerModal
        visible={currencyPickerVisible}
        title="Select Currency"
        options={CURRENCY_OPTIONS}
        selected={form.currency}
        onClose={() => setCurrencyPickerVisible(false)}
        onSelect={(val) => setForm(prev => ({ ...prev, currency: val }))}
      />

      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerClassName="px-4 pt-6 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <SelectionCardGroup
          icon={<DollarSign size={14} color="#4A7BE0" />}
          groupLabel='Salary type'
          selected={form.salaryType}
          onChange={(val) => setForm(prev => ({ ...prev, salaryType: val as SalaryType }))}
          options={salaryOptions}
          columns={2}
          layout="icon-top"
        />

        {/* Currency */}
        <View className="my-2">
          <View className="flex-row items-center gap-1.5 mb-2">
            <Globe size={14} color="#4A7BE0" />
            <Text className="font-figtree-medium">Currency</Text>
          </View>

          <TouchableOpacity onPress={() => setCurrencyPickerVisible(true)}
            className="bg-white border border-surface-border rounded-2xl px-4 py-3.5 flex-row items-center justify-between"
          >
            <Text className={`font-figtree text-sm ${form.currency ? 'text-navy-950' : 'text-surface-muted'}`}>
              {form.currency || 'Select currency'}
            </Text>
            <ChevronDown size={16} color="#9BA8C0" />
          </TouchableOpacity>

          <Text className="font-figtree text-xs text-surface-muted mt-1.5">
            Defaults to your company's country — change if needed
          </Text>
        </View>

        {/* Salary amount */}
        {(form.salaryType === 'fixed' || form.salaryType === 'range') && (
          <View className="my-2">
            <View className="flex-row items-center gap-1.5 mb-2">
              <Banknote size={14} color="#4A7BE0" />
              <Text className="font-figtree-medium">
                {form.salaryType === 'range' ? 'Salary range' : 'Salary amount'}
              </Text>
            </View>

            <View className="bg-navy-950 rounded-2xl px-4 pt-3 pb-4">
              <Text className="font-figtree text-xs text-surface-muted mb-1 tracking-widest">AMOUNT</Text>

              <View className="flex-row items-center gap-2">
                <Text className="font-figtree-bold text-surface-secondary text-base">
                  {form.currency || 'USD'}
                </Text>
                <TextInput
                  className="flex-1 font-figtree-extrabold text-white text-2xl"
                  placeholder="0"
                  placeholderTextColor="#6B7BA0"
                  keyboardType="numeric"
                  value={form.salaryMin?.toString() ?? ''}
                  onChangeText={(val) => setForm(prev => ({ ...prev, salaryMin: val ? parseInt(val) : null }))}
                />
              </View>

              {form.salaryType === 'range' && (
                <>
                  <View className="h-px bg-navy-800 my-3" />
                  <Text className="font-figtree text-xs text-surface-muted mb-1 tracking-widest">MAX</Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="font-figtree-bold text-surface-secondary text-base">
                      {form.currency || 'USD'}
                    </Text>
                    <TextInput
                      className="flex-1 font-figtree-extrabold text-white text-2xl"
                      placeholder="0"
                      placeholderTextColor="#6B7BA0"
                      keyboardType="numeric"
                      value={form.salaryMax?.toString() ?? ''}
                      onChangeText={(val) => setForm(prev => ({ ...prev, salaryMax: val ? parseInt(val) : null }))}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        )}

        {/* Pay period */}
        <SelectionCardGroup
          icon={<Clock size={14} color="#4A7BE0" />}
          groupLabel='Pay period'
          selected={form.payPeriod}
          onChange={(val) => setForm(prev => ({ ...prev, payPeriod: val as PayPeriod }))}
          options={PAY_PERIOD_OPTIONS}
          columns={2}
          layout="icon-left"
          size='sm'
        />

        {/* Salary preview */}
        {preview && (
          <View className="bg-navy-950 rounded-2xl px-4 py-4 mt-4">
            <Text className="font-figtree text-xs text-surface-muted tracking-widest mb-2">SALARY PREVIEW</Text>
            {typeof preview === 'string' ? (
              <Text className="font-figtree-extrabold text-white text-xl">{preview}</Text>
            ) : (
              <>
                <Text className="font-figtree-extrabold text-white text-2xl">{preview.amount}</Text>
                <Text className="font-figtree text-sm text-surface-secondary mt-1">
                  {preview.period} {preview.type}
                </Text>
              </>
            )}
          </View>
        )}

        {/* Buttons */}
        <SafeAreaView edges={["bottom"]} className="bg-surface-bg pt-2 pb-2 mt-4">
          <TouchableOpacity
            onPress={onNext}
            className="bg-blue rounded-2xl py-4 items-center mb-2"
          >
            <Text className="font-figtree-bold text-white text-sm">Continue to Screening</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} className="py-4 items-center">
            <Text className="font-figtree-bold text-sm text-surface-secondary">Back</Text>
          </TouchableOpacity>
        </SafeAreaView>

      </ScrollView>
    </>
  )
}

export default Compensation