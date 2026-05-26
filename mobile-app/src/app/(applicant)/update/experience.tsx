import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import ProfileItemCard from '@/features/applicant/components/cards/ProfileItemCard'
import EducationModal from '@/features/applicant/components/modals/ExperienceModal'
import { Experience as ExperienceType } from '@/features/applicant/types/applicant' 

const Experience = () => {

  const { experiences } = useLocalSearchParams();
  const parsedExperiences: ExperienceType[] = JSON.parse(experiences as string)
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <EducationModal 
        visible={showModal}
        onClose={() => setShowModal(false)}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
        <PageHeader
          mode='back'
          heading={"Work Experience"}
          subheading={"2 positions"}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >

          <TouchableOpacity onPress={() => setShowModal(true)}
            className="bg-white border border-dashed border-blue-muted rounded-2xl flex-row items-center justify-center gap-2 py-4"
          >
            <Plus size={20} color="#0D1F4E" />
            <Text className="font-figtree-extrabold text-base text-navy-950">Add new experence</Text>
          </TouchableOpacity>

          <View className='mt-3'>
            {parsedExperiences.map((experience) => (
              <ProfileItemCard
                title={experience.title}
                subtitle={`${experience.company} · ${experience.location}`}
                meta={`${experience.from} – ${experience.to} · ${experience.duration}`}
                badge={experience.current ? 'Current' : undefined}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Experience