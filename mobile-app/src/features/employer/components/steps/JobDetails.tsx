import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextAlignStart, AlignLeft, Asterisk, X, Plus, Sparkle, GraduationCap, ChevronDown, Briefcase, Calendar } from 'lucide-react-native'
import AddItemModal from '@/components/AddItemModal'
import PickerModal from '@/components/PickerModal'
import Input from '@/components/Input'
import SelectionCardGroup from '@/features/employer/components/SelectionCardGroup'
import { JobPostingForm, ExperienceLevel, EXPERIENCE_LEVEL_OPTIONS,  EducationRequirement, EDUCATION_OPTIONS  } from '@/features/employer/types/employment'

interface JobDetailsProps {
  form: JobPostingForm
  setForm: React.Dispatch<React.SetStateAction<JobPostingForm>>
  onNext: () => void
  onBack: () => void
}

const JobDetails = ({ form, setForm, onNext, onBack }: JobDetailsProps) => {

  const [responsibilityModal, setResponsibilityModal] = useState<boolean>(false);
  const [skillsModal, setSkillsModal] = useState<boolean>(false);
  const [educationPickerVisible, setEducationPickerVisible] = useState(false);

  return (
    <>
        <AddItemModal
          visible={responsibilityModal}
          title="Add a responsibility"
          subtitle="Describe one thing this role is accountable for. Be specific — it helps candidates self-assess."
          placeholder="e.g. Manage daily store operations and staff scheduling..."
          inputHint='Press "Add" to save, or keep typing and add more'
          multiline
          onClose={() => setResponsibilityModal(false)}
          onAdd={(value) => setForm(prev => ({
            ...prev,
            responsibilities: [...prev.responsibilities, value]
          }))}
        />

        <AddItemModal
          visible={skillsModal}
          title="Add a required skill"
          subtitle="Type a skill and press enter to add it. Add as many as needed."
          placeholder="e.g. Customer Service, Excel"
          inputHint='Tap a suggestion or type your own'
          onClose={() => setSkillsModal(false)}
          onAdd={(value) => setForm(prev => ({
            ...prev,
            skills: [...prev.skills, value]
          }))}
        />

        <PickerModal
          visible={educationPickerVisible}
          title="Education Requirement"
          options={EDUCATION_OPTIONS}
          selected={form.educationRequirement}
          onClose={() => setEducationPickerVisible(false)}
          onSelect={(val) => setForm(prev => ({ ...prev, educationRequirement: val }))}
        />

      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerClassName="px-4 pt-6 pb-10"
        showsVerticalScrollIndicator={false}
      >

        <Input
          icon={<TextAlignStart size={14} color={"#4A7BE0"} />}
          label='Job description'
          multiline
          value={form.description}
          onChangeText={(val) => setForm(prev => ({ ...prev, description: val }))}
        />

        <View className="flex-row items-center gap-2 my-4">
          <View className="flex-1 h-px bg-surface-border" />
          <Text className="font-figtree-medium text-sm text-surface-muted">RESPONSIBILITIES</Text>
          <View className="flex-1 h-px bg-surface-border" />
        </View>

        <View className="my-2">
          <View className="flex-row items-center gap-2 mb-2">
            <AlignLeft size={14} color="#4A7BE0" />
            <Text className="font-figtree-medium">
              Key Responsibilities <Asterisk size={10} color="#E8526A" />
            </Text>
          </View>

          <View className="border border-surface-border rounded-2xl overflow-hidden">
            {form.responsibilities.map((item, index) => (
              <View
                key={index}
                className={`flex-row items-center px-4 py-3 gap-3 ${
                  index < form.responsibilities.length - 1 ? 'border-b border-surface-border' : ''
                }`}
              >
                <View className="w-1.5 h-1.5 rounded-full bg-blue mt-0.5" />
                <Text className="flex-1 font-figtree text-sm text-navy-950">{item}</Text>
                <TouchableOpacity
                  onPress={() => setForm(prev => ({
                    ...prev,
                    responsibilities: prev.responsibilities.filter((_, i) => i !== index)
                  }))}
                >
                  <X size={14} color="#9BA8C0" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => setResponsibilityModal(true)}
              className="flex-row items-center px-4 py-3 gap-2"
            >
              <Plus size={14} color="#4A7BE0" />
              <Text className="font-figtree-bold text-sm text-blue">Add responsibility</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center gap-2 my-4">
          <View className="flex-1 h-px bg-surface-border" />
          <Text className="font-figtree-medium text-sm text-surface-muted">REQUIREMENTS</Text>
          <View className="flex-1 h-px bg-surface-border" />
        </View>

        {/* Required Skills */}
        <View className="my-2">
          <View className="flex-row items-center gap-2 mb-2">
            <Sparkle size={14} color="#4A7BE0" />
            <Text className="font-figtree-medium">
              Required Skills <Asterisk size={10} color="#E8526A" />
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {form.skills.map((skill, index) => (
              <View
                key={index}
                className="flex-row items-center bg-blue-pale rounded-full px-3 py-1.5 gap-1.5"
              >
                <Text className="font-figtree-bold text-xs text-blue">{skill}</Text>
                <TouchableOpacity
                  onPress={() => setForm(prev => ({
                    ...prev,
                    skills: prev.skills.filter((_, i) => i !== index)
                  }))}
                >
                  <X size={10} color="#4A7BE0" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => setSkillsModal(true)}  // was {/* modal later */}
              className="flex-row items-center border border-surface-border rounded-full px-3 py-1.5 gap-1.5"
            >
              <Plus size={12} color="#4A7BE0" />
              <Text className="font-figtree-bold text-xs text-blue">Add skill</Text>
            </TouchableOpacity>
          </View>

          <Text className="font-figtree text-xs text-surface-muted mt-2">
            These skills are matched against candidate resumes
          </Text>
        </View>

        {/* Years of experience */}
        <View className="my-2">
          <SelectionCardGroup
            icon={<Calendar size={14} color={"#4A7BE0"} />}
            groupLabel='Years of experience required'
            selected={form.experienceLevel}
            onChange={(val) => setForm(prev => ({ ...prev, experienceLevel: val as ExperienceLevel }))}
            options={EXPERIENCE_LEVEL_OPTIONS}
            columns={1}
            layout="icon-left"
          />
        </View>

        {/* Education requirement */}
        <View className="my-2">
          <View className="flex-row items-center gap-2 mb-2">
            <GraduationCap size={14} color="#4A7BE0" />
            <Text className="font-figtree-medium">Education requirement</Text>
          </View>

          <TouchableOpacity onPress={() => setEducationPickerVisible(true)}
            className="bg-white border border-surface-border rounded-2xl px-4 py-3.5 flex-row items-center justify-between"
          >
            <Text className={`font-figtree text-sm ${form.educationRequirement ? 'text-navy-950' : 'text-surface-muted'}`}>
              {form.educationRequirement || "Select education level"}
            </Text>
            <ChevronDown size={16} color="#9BA8C0" />
          </TouchableOpacity>

          <Text className="font-figtree text-xs text-surface-muted mt-2">
            Optional — leave blank if not required
          </Text>
        </View>

        {/* Buttons */}
        <SafeAreaView edges={["bottom"]} className="bg-surface-bg pt-2 pb-2">
          <TouchableOpacity
            onPress={onNext}
            className="bg-blue rounded-2xl py-4 items-center mb-2"
          >
            <Text className="font-figtree-bold text-white text-sm">Continue to Compensation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onBack}
            className="py-4 items-center"
          >
            <Text className="font-figtree-bold text-sm text-surface-secondary">Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

export default JobDetails
