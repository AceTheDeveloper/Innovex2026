import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FileText, DollarSign, FileCheck, Briefcase, Wrench, Sparkles, BriefcaseBusiness, X, TextAlignStart } from 'lucide-react-native'
import { useSaveJob } from '@/features/employer/hooks/useSaveJob'
import { useJobContext } from '@/features/employer/context/JobContext'
import { useMatchContext } from '@/features/employer/context/MatchContext'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import AddItemModal from '@/components/modals/AddItemModal'
import RoleBasicsModal from '@/features/employer/components/modals/RoleBasicsModal'
import CompensationModal from '@/features/employer/components/modals/CompensationModal'
import JobSaveBar from '@/features/employer/components/JobSaveBar'

const UpdateJob = () => {

  const { jobForm, setJobForm, isDirty, saveStatus, handleSave: saveJob, handleDiscard, updateForm, updateExtracted } = useJobContext()
  const { refreshJobMatches } = useMatchContext()

  const [roleBasicsModal, setRoleBasicsModal] = useState<boolean>(false);
  const [compensationModal, setCompensationModal] = useState<boolean>(false);
  const [requirementsModal, setRequirementsModal] = useState<boolean>(false);
  const [skillModal, setSkillModal] = useState<boolean>(false);
  const [niceToHaveModal, setNiceToHaveModal] = useState<boolean>(false);
  const [experienceModal, setExperienceModal] = useState<boolean>(false);
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);

  if (!jobForm) return (
    <SafeAreaView className="flex-1 bg-navy-900 items-center justify-center">
      <ActivityIndicator size="large" color="#4A7BE0" />
    </SafeAreaView>
  )
  
  const handleSave = async () => {
    await saveJob()
    if (jobForm) await refreshJobMatches(jobForm.id)  // only re-fetch this job
  }

  return (
    <>
      <RoleBasicsModal
        visible={roleBasicsModal}
        initialData={jobForm}
        onClose={() => setRoleBasicsModal(false)}
        onSave={updateForm}
      />

      <CompensationModal
        visible={compensationModal}
        initialData={jobForm.extracted.salaryRange}
        onClose={() => setCompensationModal(false)}
        onSave={(val) => updateExtracted({ salaryRange: val })}
      />

      <AddItemModal
        visible={skillModal}
        title="Add a skill"
        subtitle="Add a skill you're proficient in."
        placeholder="e.g. React Native, Patient monitoring..."
        inputHint='Press "Add" to save'
        onClose={() => setSkillModal(false)}
        onAdd={(val) => updateExtracted({ skills: [...jobForm.extracted.skills, val] })}
      >
        <View className='flex-row flex-wrap gap-2'>
          {jobForm.extracted.skills.map((skill, index) => (
            <View key={index} className="flex-row items-center bg-success-bg border border-success rounded-full px-3 py-1.5 gap-1.5">
              <Text className="font-figtree-bold text-xs text-success-dark">{skill}</Text>
              <TouchableOpacity onPress={() => setJobForm(prev => prev ? ({
                  ...prev,
                  extracted: {
                    ...prev.extracted,
                    skills: prev.extracted.skills.filter((_, i) => i !== index)
                  }
                }) : prev)}
              >
                <X size={10} color="#0F6E56" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </AddItemModal>

      <AddItemModal
        visible={requirementsModal}
        title="Add a requirement"
        subtitle="Add a must-have qualification for this role."
        placeholder="e.g. BLS certified, 2 years ICU experience..."
        inputHint='Press "Add" to save'
        onClose={() => setRequirementsModal(false)}
        onAdd={(val) => updateExtracted({ requirements: [...jobForm.extracted.requirements, val] })}
      >
        <View className='flex-row flex-wrap gap-2'>
          {jobForm.extracted.requirements.map((req, index) => (
            <View key={index} className="flex-row items-center bg-blue-pale rounded-full px-3 py-1.5 gap-1.5">
              <Text className="font-figtree-bold text-xs text-blue">{req}</Text>
              <TouchableOpacity onPress={() => setJobForm(prev => prev ? ({ 
                    ...prev, 
                    extracted: { 
                      ...prev.extracted, 
                      requirements: prev.extracted.requirements.filter((_, i) => i !== index) 
                    } 
                  }) : prev)}
              >
                <X size={10} color="#4A7BE0" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </AddItemModal>

      <AddItemModal
        visible={niceToHaveModal}
        title="Add a nice to have"
        subtitle="Add a preferred but non-essential qualification."
        placeholder="e.g. EMR systems knowledge, ACLS certified..."
        inputHint='Press "Add" to save'
        onClose={() => setNiceToHaveModal(false)}
        onAdd={(val) => updateExtracted({ niceToHave: [...jobForm.extracted.niceToHave, val] })}
      >
        <View className='flex-row flex-wrap gap-2'>
          {jobForm.extracted.niceToHave.map((item, index) => (
            <View key={index} className="flex-row items-center bg-warning-bg border border-warning rounded-full px-3 py-1.5 gap-1.5">
              <Text className="font-figtree-bold text-xs text-warning-dark">{item}</Text>
              <TouchableOpacity onPress={() => setJobForm(prev => prev ? ({
                    ...prev,
                    extracted: {
                      ...prev.extracted,
                      niceToHave: prev.extracted.niceToHave.filter((_, i) => i !== index)
                    }
                  }) : prev)}
              >
                <X size={10} color="#854F0B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </AddItemModal>

      <AddItemModal
        visible={experienceModal}
        defaultValue={jobForm.extracted.experienceYears?.toString()}
        title="Experience required"
        subtitle="Set the minimum years of experience for this role."
        placeholder="e.g. 2"
        inputHint="Enter a number of years"
        keyboardType="numeric"
        onClose={() => setExperienceModal(false)}
        onAdd={(val) => updateExtracted({ experienceYears: val ? parseInt(val) : null })}
      />

      <AddItemModal
        visible={descriptionModal}
        defaultValue={jobForm.rawText}
        title="Job description"
        subtitle="Describe the role, responsibilities, and what you're looking for."
        placeholder="e.g. We are looking for a Registered Nurse with at least 2 years of ICU experience..."
        multiline
        onClose={() => setDescriptionModal(false)}
        onAdd={(val) => updateForm({ rawText: val })}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={['top']}>
        <PageHeader
          mode="back"
          heading="Edit Job"
          subheading={`${jobForm.title} · ${jobForm.company}`}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-32"
          showsVerticalScrollIndicator={false}
        >

          <View className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <FileText size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Role Basics</Text>
              </View>
            </View>
            
            <Card>
              <View className='flex-row justify-between'>
                <View />
                <TouchableOpacity onPress={() => setRoleBasicsModal(true)}>
                  <Text className="font-figtree-bold text-sm text-blue">edit</Text>
                </TouchableOpacity>
              </View>
              <View className='flex-col gap-2'>
                <View>
                  <Text className="font-figtree text-xs text-surface-secondary">Job title</Text>
                  <Text className='font-figtree-bold text-sm text-navy-950 '>{jobForm.title}</Text>
                </View>

                <View>
                  <Text className="font-figtree text-xs text-surface-secondary">Company</Text>
                  <Text className='font-figtree-bold text-sm text-navy-950 '>{jobForm.company}</Text>
                </View>

                <View>
                  <Text className="font-figtree text-xs text-surface-secondary">Job location</Text>
                  <Text className='font-figtree-bold text-sm text-navy-950'>{`${jobForm.location} · ${jobForm.country}`}</Text>
                  {jobForm.isOverseas && (
                    <Text className="font-figtree text-xs text-success-dark">Open to overseas</Text>
                  )}
                </View>
              </View>
            </Card>
          </View>

          <View className="mt-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <TextAlignStart size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Description</Text>
              </View>
            </View>
            
            <Card>
              <View className='flex-row justify-between'>
                <View />
                <TouchableOpacity onPress={() => setDescriptionModal(true)}>
                  <Text className="font-figtree-bold text-sm text-blue">edit</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="font-figtree text-xs text-surface-secondary">Job description</Text>
                <Text className='font-figtree-medium text-sm text-navy-950 '>{jobForm.rawText}</Text>
              </View>
            </Card>
          </View>

          <View className="mt-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <DollarSign size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Compensation</Text>
              </View>
            </View>
            
            <Card>
              <View className='flex-row justify-between'>
                <View />
                <TouchableOpacity onPress={() => setCompensationModal(true)}>
                  <Text className="font-figtree-bold text-sm text-blue">edit</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="font-figtree text-xs text-surface-secondary">Salary range</Text>
                <Text className='font-figtree-bold text-sm text-navy-950 '>{jobForm.extracted.salaryRange}</Text>
              </View>
            </Card>
          </View>

          <View className="mt-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <FileCheck size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Requirements</Text>
              </View>
            </View>            
          </View>
          
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Briefcase size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Requirements</Text>
              </View>
              <TouchableOpacity onPress={() => setRequirementsModal(true)}>
                <Text className="font-figtree-bold text-sm text-blue">edit</Text>
              </TouchableOpacity>
            </View>

            {jobForm.extracted.requirements.map((req, index) => (
              <View key={index} className="flex-row items-start gap-3 mb-2">
                <View className="w-1.5 h-1.5 rounded-full bg-blue mt-1.5 flex-shrink-0" />
                <Text className="font-figtree text-sm text-navy-950 flex-1">{req}</Text>
              </View>
            ))}
          </Card>

          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Wrench size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Skills</Text>
              </View>
              <TouchableOpacity onPress={() => setSkillModal(true)}>
                <Text className="font-figtree-bold text-sm text-blue">edit</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {jobForm.extracted.skills.map((skill) => (
                <View key={skill} className="border border-success bg-success-bg rounded-full px-3 py-1.5">
                  <Text className="font-figtree-bold text-xs text-success-dark">{skill}</Text>
                </View>
              ))}
            </View>
          </Card>
            
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Sparkles size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Nice to Have</Text>
              </View>
              <TouchableOpacity onPress={() => setNiceToHaveModal(true)}>
                <Text className="font-figtree-bold text-sm text-blue">edit</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {jobForm.extracted.niceToHave.map((item) => (
                <View key={item} className="border border-warning bg-warning-bg rounded-full px-3 py-1.5">
                  <Text className="font-figtree-bold text-xs text-warning-dark">{item}</Text>
                </View>
              ))}
            </View>
          </Card>

          <Card className="mt-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <BriefcaseBusiness size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Experience</Text>
              </View>
              <TouchableOpacity onPress={() => setExperienceModal(true)}>
                <Text className="font-figtree-bold text-sm text-blue">edit</Text>
              </TouchableOpacity>
            </View>
            <View className="h-px bg-surface-border my-3" />
            <Text className="font-figtree text-xs text-surface-muted">Minimum experience required</Text>
            <Text className="font-figtree-bold text-2xl text-navy-950 mt-0.5">
              {jobForm.extracted.experienceYears}
              <Text className="font-figtree text-sm text-surface-muted"> yrs</Text>
            </Text>
          </Card>

        </ScrollView>

        <JobSaveBar
          isDirty={isDirty}
          saveStatus={saveStatus}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />

      </SafeAreaView>
    </>
  )
}

export default UpdateJob