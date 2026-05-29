import { useState } from 'react'
import { Text, View, ScrollView, Switch, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BriefcaseBusiness, Building, Clock, FileText, GraduationCap, Globe, MapPin, ChevronDown } from 'lucide-react-native'
import { JobPostingForm, EmploymentType, EMPLOYMENT_TYPE_OPTIONS } from '../../types/employment'
import Input from '@/components/Input'
import CityPickerModal from '@/components/modals/CityPickerModal'
import SelectionCardGroup from '@/features/employer/components/cards/SelectionCardGroup'

interface RoleBasicsProps {
  form: JobPostingForm
  setForm: React.Dispatch<React.SetStateAction<JobPostingForm>>
  onNext: () => void
}

const ICON_COLOR = (selected: boolean) => selected ? "#4A7BE0" : "#9BA8C0"

const RoleBasics = ({ form, setForm, onNext }: RoleBasicsProps) => {

  const [cityPickerVisible, setCityPickerVisible] = useState<boolean>(false);

  const employmentOptions = EMPLOYMENT_TYPE_OPTIONS.map((opt) => ({
    ...opt,
    icon: {
      "full-time":  <BriefcaseBusiness size={16} color={ICON_COLOR(form.employmentType === opt.value)} />,
      "part-time":  <Clock size={16} color={ICON_COLOR(form.employmentType === opt.value)} />,
      "contract":   <FileText size={16} color={ICON_COLOR(form.employmentType === opt.value)} />,
      "internship": <GraduationCap size={16} color={ICON_COLOR(form.employmentType === opt.value)} />,
    }[opt.value],
  }))

  return (
    <>

      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerClassName="px-4 pt-6 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Input
          label='Job Title'
          icon={<BriefcaseBusiness size={14} color={"#4A7BE0"} />}
          value={form.jobTitle}
          onChangeText={(val) => setForm(prev => ({ ...prev, jobTitle: val }))}
        />

        <Input
          label='Department'
          icon={<Building size={14} color={"#4A7BE0"} />}
          value={form.department}
          onChangeText={(val) => setForm(prev => ({ ...prev, department: val }))}
        />

        <SelectionCardGroup
          icon={<Clock size={14} color={"#4A7BE0"} />}
          groupLabel='Employment type'
          selected={form.employmentType}
          onChange={(val) => setForm(prev => ({ ...prev, employmentType: val as EmploymentType }))}
          options={employmentOptions}
          columns={2}
          layout="icon-top"
        />

        {/* Remote friendly toggle */}
        <View className="bg-white border border-surface-border rounded-2xl px-4 py-3 flex-row items-center mt-3">
          <View className="w-10 h-10 rounded-xl bg-blue-pale items-center justify-center mr-3">
            <Globe size={20} color="#4A7BE0" />
          </View>
          <View className="flex-1">
            <Text className="font-figtree-bold text-sm text-navy-950">Remote friendly</Text>
            <Text className="font-figtree text-xs text-surface-muted">Candidates can work anywhere</Text>
          </View>
          <Switch
            value={form.isRemote}
            onValueChange={(val) => setForm(prev => ({ ...prev, isRemote: val }))}
            trackColor={{ false: "#E4E8F2", true: "#4A7BE0" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Job location */}
        <View className="my-2">
          <View className="flex-row items-center gap-1.5 mb-2">
            <MapPin size={14} color="#4A7BE0" />
            <Text className="font-figtree-medium">Job Location</Text>
          </View>

          <View className="flex-row gap-2">
            <TextInput
              placeholder="City or town"
              placeholderTextColor="#9BA8C0"
              value={form.city}
              onChangeText={(text) => setForm(prev => ({ ...prev, city: text }))}
              className="flex-1 bg-white border border-surface-border rounded-2xl px-4 py-3.5 font-figtree-bold text-sm text-navy-950"
            />

            <View className="flex-row bg-white border border-surface-border rounded-2xl overflow-hidden">
              {(['PH', 'ID'] as const).map((country) => (
                <TouchableOpacity
                  key={country}
                  onPress={() => setForm(prev => ({ ...prev, country }))}
                  className={`px-4 py-3.5 ${form.country === country ? 'bg-navy-950' : 'bg-white'}`}
                >
                  <Text className={`font-figtree-bold text-sm ${form.country === country ? 'text-surface-bg' : 'text-surface-muted'}`}>
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text className="font-figtree text-xs text-surface-muted mt-1.5">
            Used to match candidates in this area
          </Text>
        </View>

        {/* Continue button */}
        <SafeAreaView edges={["bottom"]} className="bg-surface-bg px-4 pt-2 pb-2">
          <TouchableOpacity
            onPress={onNext}
            className="bg-blue rounded-2xl py-4 items-center"
          >
            <Text className="font-figtree-bold text-white text-sm">Continue to Job Details</Text>
          </TouchableOpacity>
        </SafeAreaView>

      </ScrollView>
    </>
  )
}

export default RoleBasics