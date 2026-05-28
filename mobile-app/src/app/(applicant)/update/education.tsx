import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GraduationCap, Pencil } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import EducationModal from '@/features/applicant/components/modals/EducationModal'
import { useProfile } from '@/features/applicant/context/ProfileContext'

const Education = () => {
  const { profile, setProfile, setIsDirty } = useProfile()
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleSave = async (value: string) => {
    setProfile(prev => ({
      ...prev,
      extracted: { ...prev.extracted, education: value }
    }))
    setIsDirty(true);
  }

  return (
    <>
      <EducationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        initialData={profile.extracted.education}
        onSave={handleSave}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={['top']}>
        <PageHeader
          mode="back"
          heading="Education"
          subheading={profile.extracted.education ? '1 education record' : 'No education added yet'}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {profile.extracted.education ? (
            <Card>
              <View className="flex-row items-start justify-between">
                <View className="flex-row gap-3 items-center flex-1">
                  <View className="w-10 h-10 rounded-xl bg-ai-light items-center justify-center flex-shrink-0">
                    <GraduationCap size={18} color="#7F77DD" />
                  </View>
                  <Text className="font-figtree-bold text-sm text-navy-950 flex-1">
                    {profile.extracted.education}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setShowModal(true)} className="ml-3">
                  <Pencil size={16} color="#9BA8C0" />
                </TouchableOpacity>
              </View>
            </Card>
          ) : (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="bg-white border border-dashed border-blue-muted rounded-2xl flex-row items-center justify-center gap-2 py-4"
            >
              <GraduationCap size={20} color="#0D1F4E" />
              <Text className="font-figtree-extrabold text-base text-navy-950">
                Add education
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Education