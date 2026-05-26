

import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import ProfileItemCard from '@/features/applicant/components/cards/ProfileItemCard'
import EducationModal from '@/features/applicant/components/modals/EducationModal'
import { Education as EducationType } from '@/features/applicant/types/applicant' 

const Experience = () => {

  const { education } = useLocalSearchParams();
  const parsedEducation: EducationType[] = JSON.parse(education as string)
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
          heading={"Education"}
          subheading={"1 education record"}
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
            <Text className="font-figtree-extrabold text-base text-navy-950">Add new education</Text>
          </TouchableOpacity>

          <View className='mt-3'>
            {parsedEducation.map((education, index) => (
              <ProfileItemCard
                key={index}
                title={education.degree}
                subtitle={education.school}
                meta={education.year}
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